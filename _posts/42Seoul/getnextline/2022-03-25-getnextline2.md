---
title: "GetNextLine(2) 프로젝트하며 겪은 시행착오들"
excerpt: "내가 짠 코드를 믿지 마라..."

categories:
  - getnextline
tags:
  - 42seoul

toc: true
toc_sticky: true

date: 2022-03-25
last_modified_at: 2022-03-25
---

자그마한 프로젝트라고 생각하며 시작했지만,  
빠가스러운 나의 삽질덕에 코드만 4~5번 엎었다.😭  

<br><br>

# 시행착오들

## 로직

처음에 고민한 로직은 크게 2가지였다.  

read로 맨 처음에 끝까지 읽고, `\n`을 기준으로 split한다는 로직을 생각했는데, 여기에는 몇가지 문제가 있었다.  

1. 처음부터 끝까지 읽으면 get_next_line함수가 호출되지 않음에도 프로그램의 data영역에 계속 존재한다.  

2. docs에서 원하는건 read횟수를 최소화하는 것이다.  

3. split으로 구현한다한들, 처리해줘야할 예외처리(개행이 마지막에 없는 경우, 마지막에 널문자가 없는 경우 등)가 너무 많다.  

<br><br>

그래서 다른 방법으로 구현해야했는데, 읽어들여서 `보관중인 데이터에 개행이 없는 경우`에 계속 read로 붙이는 방식이다.  

이 경우, 고려해야하는 점이 확실하게 줄어든다.  

1. 현재 보관중인 데이터에 개행이 있나 없나 체크 이후, 파일을 읽어서 버퍼에 담고, 이 버퍼를 보관중인 데이터와 이어붙인다.  

2. 1번 작업이 완료되면, 리턴할 문자열을 추출한다.  

3. 이후, 추출한 문자열을 제외한 문자열로 데이터를 최신화한다.  

여기까진 쉬웠는데,,,  
<br><br>

## 내 코드를 믿지 말자.

이 프로젝트에선 libft를 사용해도된다 안된다를 명시해놓진 않았지만,  
위의 작업을 실행하기위해선 libft의 함수 중 `ft_strchr`, `ft_strjoin`, `ft_calloc`등을 사용해야하고,  
필요에따라 `ft_strdup`을 `ft_strndup`으로 개조해 사용해도된다.  

문제는, 함수를 가져다 쓸 때, 상황에 맞게 수정해야한다는 것이다.  

내가 크게 간과한 부분인데,  

<br><br>
ft_strjoin에서 붙여넣을 데이터가 널포인터라던지,  
ft_strjoin에서 붙여넣을 데이터가 널포인터라던지,  
ft_strjoin에서 붙여넣을 데이터가 널포인터라던지,  
ft_strjoin에서 붙여넣을 데이터가 널포인터라던지,  
ft_strjoin에서 붙여넣을 데이터가 널포인터라던지,  

이런 부분을 이 함수 바깥쪽에서 처리해줘도 되는데,  
굳이 바깥에서 처리해서 코드 로직이 꼬이는 것 보단, 직접처리하는 함수 내부에서 처리하는게 더 깔끔한 것 같다.  
붙여넣은 이후에는 어차피 이전 데이터는 동적할당해제를 해줘야하기 때문에 안쪽에서 동적할당해제까지 해주면  
훨씬 깔끔한 코드 작성이 가능하다.  


```c
char	*ft_strjoin(char *save, char *buffer, int *rd_rtn)
{
	size_t	size_save;
	size_t	size_buf;
	char	*joinstr;

	if (!buffer)
		return (0);
	if (!save)
		save = ft_strndup("", 1);
	size_save = ft_strlen(save);
	size_buf = ft_strlen(buffer);
	joinstr = ft_calloc((size_save + size_buf + 1), sizeof(char));
	if (!joinstr)
	{
		free((void *)save);
		*rd_rtn = -1;
		return (0);
	}
	ft_strlcpy(joinstr + ft_strlcpy(joinstr,
			save, size_save + 1), buffer, size_save + size_buf + 1);
	free((void *)save);
	return (joinstr);
}
```

libft에서 구현한 strjoin은 원래 인자 둘 중 하나라도 널포인터라면 `return(0)`하고 종료되지만,
여기선 save가 널포인터라면 `""`를 넣은 데이터를 하나 할당해준다.

인자로 rd_rtn을 받는데, 함수 외부에서 사용하는 read의 리턴 변수의 포인터이다.  
joinstr에 메모리할당이 실패하면 에러케이스 이므로 데이터를 동적할당해제하고,  
데이터에 0을 담아서 get_next_line함수가 0을 리턴해 종료임을 인식하게된다.  

<br><br>

## buffer를 주시하자

<br>

```c
char	*ft_readline(int fd, char *save)
{
	char	*buffer;
	int		rd_rtn;

	buffer = ft_calloc((BUFFER_SIZE + 1), sizeof(char));
	if (!buffer)
		return (0);
	rd_rtn = 1;
	while (!ft_strchr(save, '\n') && (rd_rtn > 0))
	{
		rd_rtn = read(fd, buffer, BUFFER_SIZE);
		if (rd_rtn < 0)
		{
			free(buffer);
			return (0);
		}
		if (rd_rtn != BUFFER_SIZE)
		{
			buffer[rd_rtn] = 0;
		}
		save = ft_strjoin(save, buffer, &rd_rtn);
	}
	free(buffer);
	return (save);
}
```

read함수의 특징은 리턴값으로 `읽어서 버퍼에 저장한 데이터의 갯수`를 가진다.  
또, 버퍼에 저장할때, 버퍼가 초기화되는게 아니라, 버퍼에는 이전 데이터가 유지된 상태로 덮어쓰기된다는 것이다.  

<br>

| 0   | 1   | 2   | 3   | 4   |
| --- | --- | --- | --- | --- |
| a   | b   | c   | d   | 0   |  

가령, BUFFER_SIZE가 4이고, 이전에 읽어들인 데이터가 위와 같을때, 파일의 끝에서 e를 1바이트만큼(read의 리턴값은 1이다.)읽어들인다면, 버퍼는 아래와 같은 상태가된다.  

<br>

| 0   | 1   | 2   | 3   | 4   |
| --- | --- | --- | --- | --- |
| e   | b   | c   | d   | 0   |  

인덱스 0 위치에 e는 저장되지만, 나머지 인덱스에는 기존 데이터가 그대로 남아있으므로, 그대로 이어붙이면   

읽어들이지 않은 불필요한 데이터가 같이 붙여지게된다.  
이를 방지하기위해 내부에 rd_rtn과 버퍼사이즈를 비교하는 조건문을 걸어주고, 널값을 넣어주자.  

<br>

| 0   | 1   | 2   | 3   | 4   |
| --- | --- | --- | --- | --- |
| e   | 0   | c   | d   | 0   |

이렇게 변경하면 strjoin에서 버퍼의 끝을 인덱스 1로 인식하고 그 전까지만 이어붙이게된다.  


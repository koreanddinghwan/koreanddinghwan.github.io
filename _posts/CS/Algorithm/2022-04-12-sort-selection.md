---
title: "[Algorithm] 정렬 알고리즘"
excerpt: "GEEKS FOR GEEKS"

categories:
  - algorithm
tags:
  - computer science
  - algorithm
  - sorting

toc: true
toc_sticky: true

date: 2022-04-12
last_modified_at: 2022-04-13
---

# 정렬 알고리즘 용어 정리

- in-place sorting
  `in-place sorrting`이란, 새로운 공간을 할당해서 해결하는게 아닌, 기존에 주어진 리스트의 공간만을 활용한다는 뜻이다.  
   가령, `선택 정렬`과 `삽입 정렬`은 정렬해야하는 리스트의 공간만을 이용해 내부의 엘리먼트만 바꿔가면서 문제를 해결한다.  
   하지만, `합병 정렬`의 일반적인 경우와 `계수 정렬(counting sort)`는 `in-place sorting`이 아니다.

<br>

- Internal, External Sorting
  정렬되어야하는 모든 데이터를 한번에 메모리에 배치할 수 없을 때, `External Sorting`이라고 한다.  
   이런 `External Sorting`은 많은 양의 데이터에 사용되고, `병합 정렬`이 일반적으로 이에 사용된다.  
   하드디스크, CD같은 외부 저장소들이 이런 `External Sorting`에 사용된다.

  반면, 모든 데이터가 메모리에 한 번에 배치된다면 이런 정렬을 `Internal Sorting`이라고 한다.

<br>

- 정렬 알고리즘의 안정성

  - 정렬 후에 동등한 요소가 상대적 위치를 유지한다는 것을 의미한다.  
    <img width="566" alt="Screen Shot 2022-04-13 at 7 26 59 PM" src="https://user-images.githubusercontent.com/76278794/163158736-a4349684-e40c-4dab-bcf0-d5067ff6bfcd.png">  
    첫 줄의 10이 정렬되었는데, 기존의 `붉은색 20과 녹색 20은 순서를 유지`한다. 이러한 경우를 정렬 알고리즘의 안정성이라고 한다.

  - 다른 예시로, `(이름, 반)`의 정보를 가진 데이터를 정렬해야한다고 가정할때,  
    `(Ericsen, A)`  
    `(Ali, B)`  
    `(Ben, A)`  
    `(Lucas, A)`  
    `(Kane, B)`  
    `(Son, B)`  
    <br>
    이름순으로 정렬하면,  
    `(Ali, B)`  
    `(Ben, A)`  
    `(Ericsen, A)`  
    `(Kane, B)`  
    `(Lucas, A)`  
    `(Son, B)`  
    <br>
    그리고, 다시 반별로 정렬할 때, 안정적인 정렬 알고리즘을 사용하면 상대적인 순서가 유지되면서 정렬된다.  
    `(Ben, A)`  
    `(Ericsen, A)`  
    `(Lucas, A)`  
    `(Ali, B)`  
    `(Kane, B)`  
    `(Son, B)`  
    <br>
    하지만, 안정적이지 않은 정렬 알고리즘을 사용하면 상대적인 순서가 손실될 수 있다.  
    `(Ericsen, A)`  
    `(Lucas, A)`  
    `(Ben, A)`  
    `(Kane, B)`  
    `(Ali, B)`  
    `(Son, B)`  
    <br>
  - 안정적인 정렬 알고리즘
    버블정렬, 삽입정렬, 합병정렬, 카운팅 정렬은 본질적으로 안정적인 정렬 알고리즘이다.

  - 불안정한 정렬 알고리즘
    퀵정렬, 힙 정렬은 불안정한 정렬 알고리즘이다.  
    불안정한 정렬 알고리즘은 원소의 위치를 고려하면 안정적 정렬 알고리즘이 될 수 있다. 단, 시간 및 공간 복잡도 측면에서 떨어지게된다.

  - 퀵정렬의 최악의 경우
    리스트가 정렬되어 있는 경우, 리스트가 역순으로 정렬된 경우, 그리고 모든 원소가 같은 경우에 퀵 정렬은 n^2의 시간 복잡도를 가지게된다.

<br><br>

# 퀵 정렬

## 개요


### 특징

- 찰스 앤트니 리처드 호어가 개발한 정렬 알고리즘
- 합병정렬과 마찬가지로 `분할, 정복`을 하는 알고리즘이다.
- 다른 원소와의 비교만으로 정렬을 수행하는 비교 정렬, 최악의 경우(정렬, 역정렬, 모든원소 같음)에는 n^2이지만, 나머지의 경우 nlogn의 비교만을 수행한다.
- 불안정 정렬에 속한다.

<br>

### 코드 진행

1. 리스트 가운데 하나의 원소를 고른다. 이를 피봇이라고 한다.
2. 피봇 앞에는 피봇보다 작은 원소가, 피봇 뒤에는 피봇보다 값이 큰 모든 원소가 오도록 리스트를 둘로 나눈다.(분할)
3. 분할된 두 개의 작은 리스트에 대해 재귀적으로 이 과정을 반복해 리스트의 크기가 0이나 1이될때까지 반복한다.

<br>

### 피봇 선정

피봇을 선택하는 기준으로는 크게 4가지가 있다.  

1. 첫 번째 원소를 피봇으로 삼는다.
2. 마지막 원소를 피봇으로 삼는다.
3. 임의의 원소를 피봇으로 삼는다.
4. 중앙값을 피봇으로 삼는다.

<br>
<br>

## 코드

말로 설명하니, 크게 와닿지 않는다.

코드를 보자.

```cpp
static void	swap(int *list, int left, int right, int pivot)
{
	int	t;

	if (left > right)//만약 엇갈렸으면
		{//기준점의 값과 오른쪽에서 찾은 피봇보다 작은 값의 위치를 바꾼다.
			t = list[right];
			list[right] = list[pivot];
			list[pivot] = t;
		}
	else
		{//만약 엇갈리지 않았다면, 그 둘은 바꿔야하므로, 바꿔준다.
			t = list[right];
			list[right] = list[left];
			list[left] = t;
		}
}

static void quick_sort(int *list, int start, int end)
{
	int	pivot;
	int	left;
	int	right;

	if (start >= end)
		return ;
	pivot = start;//첫 번째 원소를 기준점으로 둔다.
	left = pivot + 1;//그 다음 원소를 왼쪽 시작점으로
	right = end;//마지막 원소를 오른쪽 시작점으로 둔다.
	while(left <= right)//왼쪽 인덱스와 오른쪽 인덱스가 엇갈릴때까지 반복
	{
		while (list[left] <= list[pivot] && left <= end)//왼쪽부터 기준점의 값보다 큰 값의 인덱스를 찾고,
			left++;
		while (list[right] >= list[pivot] && right > start) //오른쪽부터 기준점의 값보다 작은 원소를 찾는다.(시작점 안넘어가야함)
			right--;
		swap(list, left, right, pivot);
	}
	quick_sort(list, start, right - 1);
	quick_sort(list, right + 1, end);
}
```

<br>

재귀를 사용해 분할정복하는 정렬 알고리즘이어서 간단하게 작성할 수 있다.  

<br>
<br>

# 병합정렬

## 개요

### 특징

- 퀵정렬과 마찬가지, `분할, 정복`의 알고리즘 형태를 띈다.
- 존 폰 노이만에 의해 발명됨(천재)
- O(nlogn)의 시간복잡도를 가진다.
- 퀵정렬과는 달리, 최악의 경우에도 시간복잡도가 `O(nlogn)`이다.
- 안정 정렬에 속한다.

<br>

### 코드 진행

1. 나눈 배열의 크기가 1이 될 때까지 정렬대상 리스트를 절반씩 나눈다.
2. 나눈 배열의 크기가 정확하게 1이되면 병합을 수행한다.
3. 병합할때는 병합한 배열의 크기가 2의 배수가 되게끔 수행한다.
4. 병합 대상 리스트의 원소 중 작은 값을 중심으로, 작은 값들을 먼저 리스트에 붙여나간다.


<br>
<br>

## 코드

```c++
void merge(int arr[], int l, int m, int r)
{
  int i;
  int j;
  int k;
  int n1 = m - l + 1; //좌측 분할 배열 크기
  int n2 = r - m; //우측 분할 배열 크기
  int L[n1], R[n2];

  //임시 배열에 값 복사
  for (i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];

  //arr에 temp의 값을 비교하면서 값을 넣는다
  i = 0;//L의 인덱스
  j = 0;//R의 인덱스
  k = l;//arr의 인덱스
  while (i < n1 && j < n2)
  {
    if (L[i] <= R[j])
    {
      arr[k] = L[i];
      i++;
    }
    else
    {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  //비교해서 값을 넣은 후, L과 R의 남은 값들을 붙여넣음.
  while (i < n1)
  {
    arr[k] = L[i];
    i++;
    k++;
  }
  while (j < n2)
  {
    arr[k] = R[j];
    j++;
    k++;
  }
}

void mergesort(int arr[], int l, int r)
{
  if (l < r)//l >= r이라면, 원소가 1개이므로, 정렬된상태.
  {
    int m = l + (r - l) / 2; //중간값
    mergesort(arr, l, m);
    mergesort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}
```

<br><br>





[GEEKSFORGEEKS](https://www.geeksforgeeks.org/)

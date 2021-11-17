'''빌트인 함수'''

#절대값 abs()


# all: iterable 요소 안에 모두 true라면 true



# any: iterable 요소 안에 하나라도 true라면 true


# chr 아스키->문자

# ord 문자 -> 아스키

for i in range(65,123):
    print(chr(i))

print(list(map(chr, range(65,87))))

#enumerate : 인덱스 + iterable 객체

for i, name in enumerate(list(map(chr, range(65,91)))):
    print(i,name)


#filter 반복 가능한 객체에서 지정 함수 조건에 맞는 값을 추출

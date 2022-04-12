---
title:  "[Algorithm] 정렬 알고리즘"
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
last_modified_at: 2022-04-12
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





[GEEKSFORGEEKS](https://www.geeksforgeeks.org/)

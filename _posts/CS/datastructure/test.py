
class Heap:
    def __init__(self, L):
        self.A = L
        self.makeheap()

    def __str__(self):
        return str(self.A)
        

    def makeheap(self):
        n = len(self.A) 
        #데이터의 각 요소에 대해서, 마지막 요소부터 heapify_down함수를 실행
        for k in range(n-1, -1, -1):
            self.heapify_down(k,n) #매개변수로 대상 노드의 인덱스와 전체 데이터의 길이가 주어진다.

    def heapify_down(self, k,n):
        #두 자식노드의 값이 자기자신보다 작을거나 리프노드에 도달할때까지 반복
        while 2*k + 1 < n and k >= 0:
            #왼쪽 자식노드와 오른쪽 자식노드의 인덱스번호 계산
            L, R = 2 * k + 1, 2 * k + 2

            if self.A[L] > self.A[k]:
                m = L
            else:
                m = k
            if R < n and self.A[m] < self.A[R]:
                m = R
            
            
            
            if m != k:
                max_node = self.A[m]
                k_node = self.A[k]
                self.A[k] = max_node
                self.A[m] = k_node
                k = m
                
            else:
                break

    def delete_max(self):
        if len(self.A) == 0:
            return None
        #리턴할 max값 저장
        key = self.A[0]
        #대체
        self.A[0], self.A[len(self.A) - 1] = self.A[len(self.A) - 1],self.A[0]
        #삭제
        self.A.pop() 
        self.heapify_down(0,len(self.A))
        return key

    def heap_sort(self):
        n = len(self.A)
        #현재 리스트의 길이의 인덱스번호를 큰값부터 -1부여
        for k in range(len(self.A) - 1, -1, -1):
            #대체
            self.A[0], self.A[k] = self.A[k],self.A[0]
            
            #뒤로 대체된 값을 제외한 값들에 대해 heap정렬
            n = n-1
            self.heapify_down(0,n)

H = [2,8,6,1,10,15,3,12,11]

a = Heap(H)

print(H)
Heap(H).heap_sort()
print(a)


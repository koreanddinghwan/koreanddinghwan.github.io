


class Node:
    def __init__(self, key):
        self.key = key
        self.next = None

    def __str__(self):
        return str(self.key)



class singlylinkedlist:
    def __init__(self):
        self.head = None
        self.size = 0

    def __iter__(self):
        v = self.head
        while v != None:
            yield v
            v = v.next
        
    def __str__(self):
        return "->".join(str(v) for v in self)
        
    def __len__(self):
        return self.size

    def pushfront(self, key):
        new_node = Node(key)
        new_node.next = self.head
        self.head = new_node
        self.size += 1

    def pushback(self,key):
        new_node = Node(key)
        if self.size == 0:
            self.head = new_node

        else:
            tail = self.head
            while tail.next != None:
                tail = tail.next

            tail.next = new_node
        self.size += 1

    def popfront(self):
        if self.size == 0:
            return None
        else:
            x = self.head #|node(4)를 복사
            key = x.key#|key 는 node(4)의 key인 4
            self.head = x.next #|node(4).next = node(5)이므로 self.head 는 node(5)가 된다.
            self.size -= 1
            del x
            return key

    def popback(self):
        if self.size == 0: #노드가 0개인 경우
            return None

        else:
            prev, tail = None, self.head #prev에 tail을 지정해나가면서 tail.next가 none인걸 찾는다.
            while tail.next != None: #노드가 1개인 경우
                prev = tail
                tail = tail.next

            if prev == None:  #while 연산이 끝났는데, prev가 none인건 노드가 1개일때밖에 없다.
                self.head == None #pop하면 리스트가 비워지므로 self.head를 None으로 만들어 
            else:
                prev.next = None #노드가 2개이상인 경우, prev 노드가 마지막노드가 되므로 prev의 next(링크)를 지운다.

            key = tail.key
            del tail
            self.size -= 1
            return key

    def search(self,key):
        for v in self:
            if v.key == key:
                return v

        return None

    def remove(self, key):
        if self.size == 0: #연결리스트 길이 0인 경우
            return None

        elif self.head.key == key: #리스트의 헤드노드와 찾고자하는 노드의 키가 같은경우
            self.popfront() #popfront로 다음 노드를 헤드노드로 변경, 본래 헤드노드삭제

        else:
            prev, tail = None, self.head #초기값설정
            while tail.next != None: #tail.next가 none이 아닌동안
                prev = tail #prev와 tail을 한칸씩 옮겨가기
                tail = tail.next
                if tail.key == key: #만약 tail.key와 찾고자하는 키가 같다면
                    prev.next = tail.next #remove할 node의 링크를 지워버리면된다.
                    del tail #tail node를 리스트 상에서 삭제
                    self.size -= 1 #한개 삭제되었으므로 리스트 길이 1개 줄인다.
                    break
            
    def reverse(self):
        a, b = None, self.head
        while b:
            if b:
                c = b.next #c에 b의 다음노드를 복사
                b.next = a #b의 링크를 반대로 설정
            a = b
            b = c

            




test = singlylinkedlist()
test.pushfront(5)
test.pushfront(4)
test.pushfront(3)
print(test)

a, b = None, test.head
c = b.next
b.next = a
print(c)
print(a)

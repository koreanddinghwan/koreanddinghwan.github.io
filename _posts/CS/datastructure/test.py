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
            del x
            return key


a = singlylinkedlist()
a.pushfront(5)
print(a)
a.pushfront(4)
print(a)
a.pushback(3)
print(a)
print(a.popfront())
print(a)
a.pushfront(5)
a.pushfront(2)
print(a)
for i in a:
    print(i)
class Node:
    def __init__(self, key = None):
        self.key = key
        self.next = None

    def __str__(self):
        return str(self.key)

    


class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def __len__(self):
        return self.size


    def pushFront(self, key): # 2 -> 1 2
        new_node = Node(key) # new_node = Node(1)
        new_node.next = self.head # new_node.next = Node(2)
        self.head = new_node # self.head = Node(1)
        self.size += 1


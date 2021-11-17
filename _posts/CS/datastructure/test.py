import sys

d = {}
for i in range(85):
    d.setdefault(str(i),str(i))
print(d)
print(sys.getsizeof(d))

'''
빈 딕셔너리: 64
1개: 232
6개: 360
11개: 640
22개: 1176
43개: 2272
86개: 4696
'''
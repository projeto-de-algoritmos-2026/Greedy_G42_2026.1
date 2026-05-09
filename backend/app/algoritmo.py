import heapq

class Node:
    def __init__(self,char, frequencia):
        self.char=char
        self.freq=frequencia
        self.left=None
        self.rigth=None

    def __repr__(self):
        return f"{self.char}: {self.freq}"
    
def contagem(string):
    frequencia={}
    for c in string:
        if c in frequencia:
            frequencia[c]+=1
        else:
            frequencia[c]=1

    return frequencia


print(contagem('zayra'))

    
def huffman(string):
    frequencia=contagem(string)
    heap=[]
    count=0
    for char, freq in frequencia.items():

        node = Node(char, freq)
        heapq.heappush(
            heap,
            (freq, count, node)
        )

        count += 1

    # return heap

    #monta arvore
    while len(heap) > 1:
        freq1, _, left=heapq.heappop(heap)

        freq2, _, rigth= heapq.heappop(heap)

        parent =Node(None,freq1 + freq2)

        parent.left=left
        parent.rigth=rigth

        heapq.heappush(heap,(parent.freq, count, parent))

        count+=1

    raiz= heapq.heappop(heap)[2]
    # return f"{raiz}, {raiz.left.left}"
    return raiz



heap=huffman('zayra')

print(heap)
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



def arvore_json(raiz):
    nodes=[]
    edges=[]

    node_count = 1
    edge_count = 1
    def percorrer_arvore(node,parent_id=None,bit=None):
        nonlocal node_count
        nonlocal edge_count

        if node is None:
            return
        
        current_id = f"n{node_count}"
        node_count+=1

        if node.char is not None:
            label=f"{node.char}: {node.freq}"
        else:
            label= f"{node.freq}"
        
        nodes.append({
            "id": current_id,
            "label": label
        })

        if parent_id is not None:
            edges.append({
                "id": f"e{edge_count}",
                "from": parent_id,
                "to": current_id,
                "label": bit
            })
        
        #esquerda
        percorrer_arvore(node.left,current_id,"0")

        #direita
        percorrer_arvore(node.rigth,current_id,"1")

    percorrer_arvore(raiz)

    return{
        "nodes": nodes,
        "edges": edges
    }

    

# heap=huffman('zayra')

# print(heap)

# print(arvore_json(heap))
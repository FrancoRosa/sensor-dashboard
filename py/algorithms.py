##-01Insert
def ordenamientoPorInsercion(unaLista):
    for indice in range(1,len(unaLista)):

        valorActual = unaLista[indice]
        posicion = indice

        while posicion>0 and unaLista[posicion-1]>valorActual:
            unaLista[posicion]=unaLista[posicion-1]
            posicion = posicion-1

        unaLista[posicion]=valorActual
    return(unaLista)
# ordenamientoPorInsercion(unaLista) 

##-02Shell
def ordenamientoDeShell(unaLista):
    contadorSublistas = len(unaLista)//2
    while contadorSublistas > 0:
        for posicionInicio in range(contadorSublistas):
            brechaOrdenamientoPorInsercion(unaLista,posicionInicio,contadorSublistas)
        contadorSublistas = contadorSublistas // 2
    return unaLista

def brechaOrdenamientoPorInsercion(unaLista,inicio,brecha):
    for i in range(inicio+brecha,len(unaLista),brecha):

        valorActual = unaLista[i]
        posicion = i

        while posicion>=brecha and unaLista[posicion-brecha]>valorActual:
            unaLista[posicion]=unaLista[posicion-brecha]
            posicion = posicion-brecha

        unaLista[posicion]=valorActual
# ordenamientoDeShell(unaLista)

##-03Bubble
def ordenamientoBurbuja(unaLista):
    for numPasada in range(len(unaLista)-1,0,-1):
        for i in range(numPasada):
            if unaLista[i]>unaLista[i+1]:
                temp = unaLista[i]
                unaLista[i] = unaLista[i+1]
                unaLista[i+1] = temp
    return unaLista
# ordenamientoBurbuja(unaLista)

##-04Merge
def ordenamientoPorMezcla(unaLista):
    if len(unaLista)>1:
        mitad = len(unaLista)//2
        mitadIzquierda = unaLista[:mitad]
        mitadDerecha = unaLista[mitad:]

        ordenamientoPorMezcla(mitadIzquierda)
        ordenamientoPorMezcla(mitadDerecha)

        i=0
        j=0
        k=0
        while i < len(mitadIzquierda) and j < len(mitadDerecha):
            if mitadIzquierda[i] < mitadDerecha[j]:
                unaLista[k]=mitadIzquierda[i]
                i=i+1
            else:
                unaLista[k]=mitadDerecha[j]
                j=j+1
            k=k+1

        while i < len(mitadIzquierda):
            unaLista[k]=mitadIzquierda[i]
            i=i+1
            k=k+1

        while j < len(mitadDerecha):
            unaLista[k]=mitadDerecha[j]
            j=j+1
            k=k+1
    return unaLista
# ordenamientoPorMezcla(unaLista)
 
##-05Quicksort
def ordenamientoRapido(unaLista):
    ordenamientoRapidoAuxiliar(unaLista,0,len(unaLista)-1)
    return unaLista
def ordenamientoRapidoAuxiliar(unaLista,primero,ultimo):
   if primero<ultimo:

       puntoDivision = particion(unaLista,primero,ultimo)

       ordenamientoRapidoAuxiliar(unaLista,primero,puntoDivision-1)
       ordenamientoRapidoAuxiliar(unaLista,puntoDivision+1,ultimo)
def particion(unaLista,primero,ultimo):
   valorPivote = unaLista[primero]

   marcaIzq = primero+1
   marcaDer = ultimo

   hecho = False
   while not hecho:

       while marcaIzq <= marcaDer and unaLista[marcaIzq] <= valorPivote:
           marcaIzq = marcaIzq + 1

       while unaLista[marcaDer] >= valorPivote and marcaDer >= marcaIzq:
           marcaDer = marcaDer -1

       if marcaDer < marcaIzq:
           hecho = True
       else:
           temp = unaLista[marcaIzq]
           unaLista[marcaIzq] = unaLista[marcaDer]
           unaLista[marcaDer] = temp

   temp = unaLista[primero]
   unaLista[primero] = unaLista[marcaDer]
   unaLista[marcaDer] = temp


   return marcaDer
# ordenamientoRapido(unaLista)
 
##-06Bucket
def bucket_sort(inpvalue):
    largest = max(inpvalue)
    length = len(inpvalue)
    size = largest/length
 
    buckets = [[] for _ in range(length)]
    for i in range(length):
        j = int(inpvalue[i]/size)
        
        if j != length:
            buckets[j].append(inpvalue[i])
        else:
            buckets[length - 1].append(inpvalue[i])
 
    for i in range(length):
        insertion(buckets[i])
 
    res = []
    
    for i in range(length):
        res = res + buckets[i]
 
    return res

# bucket_sort(array)


##-07Radix
def countingSort(arr, exp1): 
   
    n = len(arr) 
   
    # The output array elements that will have sorted arr 
    output = [0] * (n) 
   
    # initialize count array as 0 
    count = [0] * (10) 
   
    # Store count of occurrences in count[] 
    for i in range(0, n): 
        index = (arr[i]/exp1) 
        count[int((index)%10)] += 1
   
    # Change count[i] so that count[i] now contains actual 
    #  position of this digit in output array 
    for i in range(1,10): 
        count[i] += count[i-1] 
   
    # Build the output array 
    i = n-1
    while i>=0: 
        index = (arr[i]/exp1) 
        output[ count[ int((index)%10) ] - 1] = arr[i] 
        count[int((index)%10)] -= 1
        i -= 1
   
    # Copying the output array to arr[], 
    # so that arr now contains sorted numbers 
    i = 0
    for i in range(0,len(arr)): 
        arr[i] = output[i] 
# Method to do Radix Sort
def radixSort(arr):
 
    # Find the maximum number to know number of digits
    max1 = max(arr)
 
    # Do counting sort for every digit. Note that instead
    # of passing digit number, exp is passed. exp is 10^i
    # where i is current digit number
    exp = 1
    while max1/exp > 0:
        countingSort(arr,exp)
        exp *= 10
    return arr
# radixSort(arr)
 
##-08heap
def heapify(arr, n, i): 
    largest = i  # Initialize largest as root 
    l = 2 * i + 1     # left = 2*i + 1 
    r = 2 * i + 2     # right = 2*i + 2 
  
    # See if left child of root exists and is 
    # greater than root 
    if l < n and arr[i] < arr[l]: 
        largest = l 
  
    # See if right child of root exists and is 
    # greater than root 
    if r < n and arr[largest] < arr[r]: 
        largest = r 
  
    # Change root, if needed 
    if largest != i: 
        arr[i],arr[largest] = arr[largest],arr[i]  # swap 
  
        # Heapify the root. 
        heapify(arr, n, largest) 
# The main function to sort an array of given size 
def heapSort(arr): 
    n = len(arr) 
  
    # Build a maxheap. 
    # Since last parent will be at ((n//2)-1) we can start at that location. 
    for i in range(n // 2 - 1, -1, -1): 
        heapify(arr, n, i) 
  
    # One by one extract elements 
    for i in range(n-1, 0, -1): 
        arr[i], arr[0] = arr[0], arr[i]   # swap 
        heapify(arr, i, 0) 
  
    return arr
# heapSort(arr) 

##-09Count
def countingSort(arr, exp1): 
   
    n = len(arr) 
    # The output array elements that will have sorted arr 
    output = [0] * (n) 
   
    # initialize count array as 0 
    count = [0] * (10) 
   
    # Store count of occurrences in count[] 
    for i in range(0, n): 
        index = (arr[i]/exp1) 
        count[int((index)%10)] += 1
   
    # Change count[i] so that count[i] now contains actual 
    #  position of this digit in output array 
    for i in range(1,10): 
        count[i] += count[i-1] 
   
    # Build the output array 
    i = n-1
    while i>=0: 
        index = (arr[i]/exp1) 
        output[ count[ int((index)%10) ] - 1] = arr[i] 
        count[int((index)%10)] -= 1
        i -= 1
   
    # Copying the output array to arr[], 
    # so that arr now contains sorted numbers 
    i = 0
    for i in range(0,len(arr)): 
        arr[i] = output[i] 
# Method to do Radix Sort
def radixSort(arr):
 
    # Find the maximum number to know number of digits
    max1 = max(arr)
 
    # Do counting sort for every digit. Note that instead
    # of passing digit number, exp is passed. exp is 10^i
    # where i is current digit number
    exp = 1
    while max1/exp > 0:
        countingSort(arr,exp)
        exp *= 10
    
    return arr
# Driver code to test above
# radixSort(arr)
 
##-10bin
def insertion(inpvalue):
    for i in range(1, len(inpvalue)):
        temp = inpvalue[i]
        j = i - 1
        while (j >= 0 and temp < inpvalue[j]):
            inpvalue[j + 1] = inpvalue[j]
            j = j - 1
        inpvalue[j + 1] = temp

def bin_sort(inpvalue):
    largest = max(inpvalue)
    length = len(inpvalue)
    size = largest/length
 
    buckets = [[] for _ in range(length)]
    for i in range(length):
        j = int(inpvalue[i]/size)
        
        if j != length:
            buckets[j].append(inpvalue[i])
        else:
            buckets[length - 1].append(inpvalue[i])
 
    for i in range(length):
        insertion(buckets[i])
 
    res = []
    
    for i in range(length):
        res = res + buckets[i]
 
    return res
 
# bin_sort(array)

 
##-11randomized select
def ordenamientoPorSeleccion(unaLista):
    for llenarRanura in range(len(unaLista)-1,0,-1):
        posicionDelMayor=0
        for ubicacion in range(1,llenarRanura+1):
            if unaLista[ubicacion]>unaLista[posicionDelMayor]:
                posicionDelMayor = ubicacion

        temp = unaLista[llenarRanura]
        unaLista[llenarRanura] = unaLista[posicionDelMayor]
        unaLista[posicionDelMayor] = temp
    return unaLista
# ordenamientoPorSeleccion(unaLista)

##-12Stooge
def stoogesort(arr, l, h):
    if l >= h:
        return
  
    # If first element is smaller
    # than last,swap them
    if arr[l]>arr[h]:
        t = arr[l]
        arr[l] = arr[h]
        arr[h] = t
  
    # If there are more than 2 elements in
    # the array
    if h-l+1 > 2:
        t = (int)((h-l+1)/3)
  
        # Recursively sort first 2/3 elements
        stoogesort(arr, l, (h-t))
  
        # Recursively sort last 2/3 elements
        stoogesort(arr, l+t, (h))
  
        # Recursively sort first 2/3 elements
        # again to confirm
        stoogesort(arr, l, (h-t))
    return arr
  
def orderMethod(method, array, samples):
    samples = int(samples)
    ## 01
    if 'Insercion' in method:
        return ordenamientoPorInsercion(array[:samples])  
    ## 02
    if 'Shell' in method:
        return ordenamientoDeShell(array[:samples])
    ## 03
    if 'Bubble' in method:
        return ordenamientoBurbuja(array[:samples])  
    ## 04
    if 'Merge' in method:
        return ordenamientoPorMezcla(array[:samples])
    ## 05
    if 'QuickSort' in method:
        return ordenamientoRapido(array[:samples])  
    ## 06
    if 'Bucket' in method:
        return bucket_sort(array[:samples])
    ## 07
    if 'Radix' in method:
        return radixSort(array[:samples])  
    ## 08
    if 'Heap' in method:
        return heapSort(array[:samples])
    ## 09
    if 'Count' in method:
        return radixSort(array[:samples])  
    ## 10
    if 'Bin' in method:
        return bin_sort(array[:samples])
    ## 11
    if 'RandomiseSelection' in method:
        return ordenamientoPorSeleccion(array[:samples])  
    ## 12
    if 'Stooge' in method:
        return stoogesort(array[:samples], 0, samples -1)   
    ## Bonus
    if 'PythonSort' in method:
        return sorted(array[:samples])


# Algorithms test
"""
arr = [8,4,3,6,7,8,3,45,7,8]
# arr = ['d','e','f','g','h','a','b','c']
print(arr)

print(ordenamientoPorInsercion(arr))   #01
print(ordenamientoDeShell(arr))        #02
print(ordenamientoBurbuja(arr))        #03
print(ordenamientoPorMezcla(arr))      #04
print(ordenamientoRapido(arr))         #05
print(bucket_sort(arr))                #06
print(radixSort(arr))                  #07
print(heapSort(arr) )                  #08
print(radixSort(arr))                  #09
print(bin_sort(arr))                   #10
print(ordenamientoPorSeleccion(arr))   #11
print(stoogesort(arr, 0, len(arr)-1))  #12
"""
import { useState, useEffect } from "react";

// ─── Chapitres ────────────────────────────────────────────────────────────────
const CHAPITRES = [
  { id:"tris",        num:"01", label:"Algorithmes de tri",       color:"#b45309", light:"#fef9ee", border:"#fde68a" },
  { id:"structures",  num:"02", label:"Structures de données",    color:"#1d4ed8", light:"#eff6ff", border:"#bfdbfe" },
  { id:"graphes",     num:"03", label:"Graphes & Arbres",         color:"#15803d", light:"#f0fdf4", border:"#bbf7d0" },
  { id:"recursivite", num:"04", label:"Récursivité & DP",         color:"#7c3aed", light:"#faf5ff", border:"#e9d5ff" },
  { id:"recherche",   num:"05", label:"Algorithmes de recherche", color:"#0e7490", light:"#ecfeff", border:"#a5f3fc" },
  { id:"complexite",  num:"06", label:"Complexité algorithmique", color:"#be123c", light:"#fff1f2", border:"#fecdd3" },
];

// ─── Fiches ───────────────────────────────────────────────────────────────────
const FICHES = [
  // ── TRIS ──────────────────────────────────────────────────────────────────
  {
    id:1, chapitre:"tris", ordre:1,
    titre:"Tri à bulles",
    resume:"Compare et échange des éléments adjacents. Simple, pédagogique, peu efficace.",
    definition:`Le tri à bulles parcourt le tableau plusieurs fois. À chaque passe, chaque paire d'éléments adjacents est comparée et échangée si nécessaire. Les grandes valeurs "remontent" vers la fin comme des bulles.

Points clés :
• Stable : préserve l'ordre relatif des éléments égaux
• En-place : pas de tableau auxiliaire
• Optimisable : arrêt anticipé si aucun échange en une passe
• Intérêt : essentiellement pédagogique`,
    code:`def tri_bulles(tab):
    n = len(tab)
    for i in range(n - 1):
        echange = False
        for j in range(0, n - i - 1):
            if tab[j] > tab[j + 1]:
                tab[j], tab[j + 1] = tab[j + 1], tab[j]
                echange = True
        if not echange:
            break  # Déjà trié, on arrête
    return tab

# Utilisation
print(tri_bulles([64, 34, 25, 12, 22, 11, 90]))
# → [11, 12, 22, 25, 34, 64, 90]`,
    schema:`Tableau initial : [5, 3, 8, 1, 2]

Passe 1 (i=0) :
  [5, 3, 8, 1, 2] → [3, 5, 8, 1, 2]   (5 > 3, échange)
  [3, 5, 8, 1, 2] → [3, 5, 8, 1, 2]   (5 < 8, ok)
  [3, 5, 8, 1, 2] → [3, 5, 1, 8, 2]   (8 > 1, échange)
  [3, 5, 1, 8, 2] → [3, 5, 1, 2, 8]   (8 > 2, échange) ← 8 en place ✓

Passe 2 (i=1) :
  [3, 5, 1, 2, 8] → [3, 1, 2, 5, 8]   ...

Résultat : [1, 2, 3, 5, 8] ✓`,
    complexite:{ temps_moy:"O(n²)", temps_meil:"O(n)", temps_pire:"O(n²)", espace:"O(1)", stable:true },
  },
  {
    id:2, chapitre:"tris", ordre:2,
    titre:"Tri par sélection",
    resume:"Trouve le minimum et le place au bon endroit à chaque passe. Toujours O(n²).",
    definition:`Le tri par sélection divise le tableau en deux parties : une partie triée (à gauche) et une partie non triée (à droite). À chaque itération, il trouve le minimum de la partie non triée et l'insère à la fin de la partie triée.

Points clés :
• Instable : peut changer l'ordre des éléments égaux
• En-place : O(1) d'espace auxiliaire
• Exactement n-1 échanges (peu d'échanges)
• Peu efficace même si le tableau est déjà trié`,
    code:`def tri_selection(tab):
    n = len(tab)
    for i in range(n - 1):
        # Trouver l'indice du minimum dans tab[i..n-1]
        idx_min = i
        for j in range(i + 1, n):
            if tab[j] < tab[idx_min]:
                idx_min = j
        # Placer le minimum à sa bonne position
        tab[i], tab[idx_min] = tab[idx_min], tab[i]
    return tab

print(tri_selection([64, 25, 12, 22, 11]))
# → [11, 12, 22, 25, 64]`,
    schema:`[64, 25, 12, 22, 11]
         ↑ min=11 (idx=4) → échange avec idx=0
[11, 25, 12, 22, 64]  ← 11 trié ✓
     ↑ min=12 (idx=2) → échange avec idx=1
[11, 12, 25, 22, 64]  ← 12 trié ✓
         ↑ min=22 (idx=3) → échange avec idx=2
[11, 12, 22, 25, 64]  ← 22 trié ✓
             ↑ min=25 → déjà en place ✓
[11, 12, 22, 25, 64]  ✓`,
    complexite:{ temps_moy:"O(n²)", temps_meil:"O(n²)", temps_pire:"O(n²)", espace:"O(1)", stable:false },
  },
  {
    id:3, chapitre:"tris", ordre:3,
    titre:"Tri par insertion",
    resume:"Insère chaque élément à sa bonne place dans la partie déjà triée. Très efficace sur les tableaux quasi-triés.",
    definition:`Le tri par insertion construit le tableau trié un élément à la fois. Il prend chaque élément et l'insère à la bonne position dans la partie gauche déjà triée, en décalant les éléments plus grands vers la droite.

Points clés :
• Stable et en-place
• Très efficace pour les tableaux quasi-triés (O(n) dans ce cas)
• Adaptatif : le nombre d'opérations dépend de l'ordre initial
• Utilisé comme optimisation finale dans certains tris hybrides (Timsort)`,
    code:`def tri_insertion(tab):
    for i in range(1, len(tab)):
        cle = tab[i]        # Élément à insérer
        j = i - 1
        # Décaler les éléments plus grands vers la droite
        while j >= 0 and tab[j] > cle:
            tab[j + 1] = tab[j]
            j -= 1
        tab[j + 1] = cle   # Insérer à la bonne position
    return tab

print(tri_insertion([12, 11, 13, 5, 6]))
# → [5, 6, 11, 12, 13]`,
    schema:`[12, 11, 13, 5, 6]
  i=1, clé=11 : [12,12,13,5,6] → [11,12,13,5,6]
  i=2, clé=13 : 12<13, ok    → [11,12,13,5,6]
  i=3, clé= 5 : décalages    → [ 5,11,12,13,6]
  i=4, clé= 6 : décalages    → [ 5, 6,11,12,13] ✓

Partie triée ██ | Reste ░░░
██ | 11░13░5░6░  →  ██11░ | 13░5░6░  → ...`,
    complexite:{ temps_moy:"O(n²)", temps_meil:"O(n)", temps_pire:"O(n²)", espace:"O(1)", stable:true },
  },
  {
    id:4, chapitre:"tris", ordre:4,
    titre:"Tri fusion (Merge Sort)",
    resume:"Divise récursivement puis fusionne. Garanti O(n log n) dans tous les cas.",
    definition:`Le tri fusion applique le paradigme "Diviser pour Régner" :
1. Diviser : couper le tableau en deux moitiés
2. Régner : trier récursivement chaque moitié
3. Combiner : fusionner les deux moitiés triées

Points clés :
• Stable et prévisible : O(n log n) dans tous les cas
• Non en-place : nécessite O(n) d'espace auxiliaire
• Base du Timsort (Python natif, Java) pour les données réelles
• Idéal pour les listes chaînées et les grandes données`,
    code:`def tri_fusion(tab):
    if len(tab) <= 1:
        return tab

    milieu = len(tab) // 2
    gauche = tri_fusion(tab[:milieu])
    droite = tri_fusion(tab[milieu:])
    return fusionner(gauche, droite)

def fusionner(g, d):
    resultat = []
    i = j = 0
    while i < len(g) and j < len(d):
        if g[i] <= d[j]:
            resultat.append(g[i]); i += 1
        else:
            resultat.append(d[j]); j += 1
    return resultat + g[i:] + d[j:]

print(tri_fusion([38, 27, 43, 3, 9, 82, 10]))
# → [3, 9, 10, 27, 38, 43, 82]`,
    schema:`[38, 27, 43, 3, 9, 82, 10]
         ↙                ↘
  [38, 27, 43]       [3, 9, 82, 10]
    ↙     ↘            ↙        ↘
 [38]  [27,43]      [3,9]    [82,10]
          ↓              ↓
       [27,38,43]   [3,9,10,82]
               ↘  ↙
    [3, 9, 10, 27, 38, 43, 82] ✓`,
    complexite:{ temps_moy:"O(n log n)", temps_meil:"O(n log n)", temps_pire:"O(n log n)", espace:"O(n)", stable:true },
  },
  {
    id:5, chapitre:"tris", ordre:5,
    titre:"Tri rapide (Quick Sort)",
    resume:"Partitionne autour d'un pivot. Le plus rapide en pratique malgré un pire cas O(n²).",
    definition:`Le tri rapide choisit un pivot et partitionne le tableau :
- Éléments < pivot → à gauche
- Éléments > pivot → à droite
Puis trie récursivement les deux parties.

Points clés :
• En-place (O(log n) d'espace via la pile d'appels)
• Instable dans sa version classique
• Pire cas O(n²) si pivot mal choisi (tableau trié, pivot = premier)
• En pratique, le plus rapide des tris de comparaison (bonnes constantes)
• Stratégies de choix du pivot : milieu, médiane de 3, aléatoire`,
    code:`def tri_rapide(tab, g=None, d=None):
    if g is None: g = 0
    if d is None: d = len(tab) - 1

    if g < d:
        p = partitionner(tab, g, d)
        tri_rapide(tab, g, p - 1)
        tri_rapide(tab, p + 1, d)
    return tab

def partitionner(tab, g, d):
    pivot = tab[d]  # Dernier élément comme pivot
    i = g - 1
    for j in range(g, d):
        if tab[j] <= pivot:
            i += 1
            tab[i], tab[j] = tab[j], tab[i]
    tab[i + 1], tab[d] = tab[d], tab[i + 1]
    return i + 1

print(tri_rapide([10, 7, 8, 9, 1, 5]))
# → [1, 5, 7, 8, 9, 10]`,
    schema:`[3, 6, 8, 10, 1, 2, 1]  pivot = 1
  Partition : [<1] | [1] | [>1]
  → [] | [1] | [1, 2, 3, 6, 8, 10]

           [1, 2, 3, 6, 8, 10]  pivot = 10
                            ↓
  [1, 2, 3, 6, 8] | [10] | []

    [1, 2, 3, 6, 8]  pivot = 8
    [1,2,3,6] | [8] | []  → ...

Résultat final : [1, 1, 2, 3, 6, 8, 10] ✓`,
    complexite:{ temps_moy:"O(n log n)", temps_meil:"O(n log n)", temps_pire:"O(n²)", espace:"O(log n)", stable:false },
  },
  {
    id:6, chapitre:"tris", ordre:6,
    titre:"Tri par tas (Heap Sort)",
    resume:"Exploite la structure de tas max. Garantit O(n log n) et est en-place.",
    definition:`Le tri par tas se déroule en deux phases :
1. Construction d'un tas-max : réorganiser le tableau en tas-max
2. Extraction : extraire la racine (max), la placer à la fin, restaurer le tas

Un tas-max est un arbre binaire complet où chaque parent ≥ ses enfants.

Points clés :
• En-place et O(n log n) dans tous les cas
• Instable
• Moins bon en pratique que quicksort (mauvaise localité mémoire)
• Utile quand on veut garantir O(n log n) sans espace auxiliaire`,
    code:`def tas_max(tab, n, i):
    plus_grand = i
    g, d = 2*i + 1, 2*i + 2

    if g < n and tab[g] > tab[plus_grand]:
        plus_grand = g
    if d < n and tab[d] > tab[plus_grand]:
        plus_grand = d

    if plus_grand != i:
        tab[i], tab[plus_grand] = tab[plus_grand], tab[i]
        tas_max(tab, n, plus_grand)

def tri_tas(tab):
    n = len(tab)
    # Phase 1 : construire le tas-max
    for i in range(n // 2 - 1, -1, -1):
        tas_max(tab, n, i)
    # Phase 2 : extraire les éléments
    for i in range(n - 1, 0, -1):
        tab[0], tab[i] = tab[i], tab[0]
        tas_max(tab, i, 0)
    return tab

print(tri_tas([12, 11, 13, 5, 6, 7]))
# → [5, 6, 7, 11, 12, 13]`,
    schema:`Tableau → représentation en arbre :
       [4, 10, 3, 5, 1]
            4(0)
           /    \\
        10(1)   3(2)
        /  \\
      5(3) 1(4)

Après construction du tas-max :
         10
        /  \\
       5    3
      / \\
     4   1
→ [10, 5, 3, 4, 1]

Extraction de 10 → place à la fin, etc.`,
    complexite:{ temps_moy:"O(n log n)", temps_meil:"O(n log n)", temps_pire:"O(n log n)", espace:"O(1)", stable:false },
  },

  // ── STRUCTURES ─────────────────────────────────────────────────────────────
  {
    id:7, chapitre:"structures", ordre:1,
    titre:"Liste (tableau dynamique)",
    resume:"La structure de base de Python. Accès O(1), insertion en fin O(1) amorti.",
    definition:`La liste Python est un tableau dynamique redimensionnable. Elle alloue plus de mémoire que nécessaire pour éviter les réallocations fréquentes (facteur ~1.125 à chaque doublement).

Opérations fondamentales et leurs complexités :
• Accès par indice tab[i] : O(1)
• Insertion/suppression en fin  (append/pop) : O(1) amorti
• Insertion/suppression en début : O(n) — décalage de tous les éléments
• Recherche d'un élément : O(n)
• Tri (Timsort) : O(n log n)`,
    code:`# Opérations de base
tab = [1, 2, 3, 4, 5]

# Accès — O(1)
print(tab[2])          # → 3
print(tab[-1])         # → 5

# Insertion/suppression — O(1) amorti
tab.append(6)          # [1,2,3,4,5,6]
dernier = tab.pop()    # → 6, [1,2,3,4,5]

# Insertion en position — O(n)
tab.insert(0, 0)       # [0,1,2,3,4,5]
tab.pop(0)             # → 0, O(n)

# Slicing — O(k) avec k=taille du slice
sous = tab[1:4]        # [2, 3, 4]

# Compréhension de liste
carres = [x**2 for x in range(10) if x % 2 == 0]
# → [0, 4, 16, 36, 64]`,
    schema:`Mémoire :
index :  0    1    2    3    4   [réservé]
       ┌────┬────┬────┬────┬────┬────┐
valeur:│ 1  │ 2  │ 3  │ 4  │ 5  │    │
       └────┴────┴────┴────┴────┴────┘
                                  ↑ len=5, capacity=6

append(6) : O(1), juste remplir la case libre
append(7) : capacité dépassée → réallocation × 1.5`,
    complexite:{ temps_moy:"O(1) accès", temps_meil:"O(1)", temps_pire:"O(n) insert[0]", espace:"O(n)", stable:null },
  },
  {
    id:8, chapitre:"structures", ordre:2,
    titre:"Liste chaînée simple",
    resume:"Nœuds liés par des pointeurs. Insertion en tête O(1), accès O(n).",
    definition:`Une liste chaînée est une séquence de nœuds où chaque nœud contient une valeur et un pointeur vers le nœud suivant. Le dernier nœud pointe vers None.

Avantages vs tableau :
• Insertion/suppression en tête ou position connue : O(1)
• Pas de réallocation : la mémoire est allouée à la demande

Inconvénients :
• Accès par indice : O(n) — pas d'accès direct
• Mémoire supplémentaire pour les pointeurs
• Mauvaise localité mémoire (cache-unfriendly)`,
    code:`class Noeud:
    def __init__(self, val):
        self.val = val
        self.suivant = None

class ListeChainee:
    def __init__(self):
        self.tete = None

    def inserer_tete(self, val):      # O(1)
        n = Noeud(val)
        n.suivant = self.tete
        self.tete = n

    def inserer_fin(self, val):       # O(n)
        n = Noeud(val)
        if not self.tete:
            self.tete = n; return
        courant = self.tete
        while courant.suivant:
            courant = courant.suivant
        courant.suivant = n

    def supprimer(self, val):         # O(n)
        if not self.tete: return
        if self.tete.val == val:
            self.tete = self.tete.suivant; return
        c = self.tete
        while c.suivant and c.suivant.val != val:
            c = c.suivant
        if c.suivant: c.suivant = c.suivant.suivant

    def afficher(self):
        c, res = self.tete, []
        while c: res.append(c.val); c = c.suivant
        print(" → ".join(map(str, res)) + " → None")`,
    schema:`inserer_tete(3) sur [1 → 2 → None] :

  Avant :  tete → [1|●] → [2|None]
  Nouveau nœud : [3|●]
  n.suivant = tete (pointe sur 1)
  tete = n

  Après :  tete → [3|●] → [1|●] → [2|None]`,
    complexite:{ temps_moy:"O(n) accès", temps_meil:"O(1) insert tête", temps_pire:"O(n) insert fin", espace:"O(n)", stable:null },
  },
  {
    id:9, chapitre:"structures", ordre:3,
    titre:"Pile (Stack)",
    resume:"LIFO : le dernier entré est le premier sorti. Push/pop en O(1).",
    definition:`Une pile est une structure de données LIFO (Last In, First Out). Seul le sommet est accessible. Les opérations fondamentales sont :
• push(x) : empiler x au sommet
• pop() : dépiler et retourner le sommet
• peek() : lire le sommet sans le supprimer

Applications classiques :
• Évaluation d'expressions (parenthèses, RPN)
• Parcours DFS de graphes
• Gestion des appels de fonctions (call stack)
• Undo/Redo dans les éditeurs`,
    code:`# Implémentation avec liste Python (recommandée)
class Pile:
    def __init__(self):
        self._data = []

    def push(self, val):        # O(1) amorti
        self._data.append(val)

    def pop(self):              # O(1)
        if self.est_vide():
            raise IndexError("Pile vide")
        return self._data.pop()

    def peek(self):             # O(1)
        return self._data[-1]

    def est_vide(self):
        return len(self._data) == 0

    def __len__(self):
        return len(self._data)

# Application : vérification des parenthèses
def parentheses_valides(s):
    pile = Pile()
    paires = {')':'(', ']':'[', '}':'{'}
    for c in s:
        if c in '([{': pile.push(c)
        elif c in ')]}':
            if pile.est_vide() or pile.pop() != paires[c]:
                return False
    return pile.est_vide()

print(parentheses_valides("({[]})"))  # True
print(parentheses_valides("({[})"))   # False`,
    schema:`push(3) push(7) push(1) :

       ┌───┐
  top →│ 1 │ ← push(1) en dernier
       ├───┤
       │ 7 │
       ├───┤
       │ 3 │ ← push(3) en premier
       └───┘

pop() → 1   (LIFO)
pop() → 7
pop() → 3`,
    complexite:{ temps_moy:"O(1)", temps_meil:"O(1)", temps_pire:"O(1)", espace:"O(n)", stable:null },
  },
  {
    id:10, chapitre:"structures", ordre:4,
    titre:"File (Queue)",
    resume:"FIFO : le premier entré est le premier sorti. Utiliser collections.deque.",
    definition:`Une file est une structure FIFO (First In, First Out). Les éléments entrent par l'arrière (enqueue) et sortent par l'avant (dequeue).

Important en Python : NE PAS utiliser une liste simple car list.pop(0) est O(n). Utiliser collections.deque qui garantit O(1) des deux côtés.

Applications :
• Parcours BFS de graphes
• Gestion de tâches / files d'attente
• Buffers de communication
• Impression de documents`,
    code:`from collections import deque

class File:
    def __init__(self):
        self._data = deque()

    def enfiler(self, val):     # O(1)
        self._data.append(val)

    def defiler(self):          # O(1)
        if self.est_vide():
            raise IndexError("File vide")
        return self._data.popleft()

    def premier(self):
        return self._data[0]

    def est_vide(self):
        return len(self._data) == 0

# File de priorité avec heapq
import heapq

class FilePriorite:
    def __init__(self):
        self._tas = []
        self._compteur = 0  # Pour départager à priorité égale

    def ajouter(self, val, priorite):
        heapq.heappush(self._tas, (priorite, self._compteur, val))
        self._compteur += 1

    def extraire(self):
        return heapq.heappop(self._tas)[2]`,
    schema:`enfiler(A) enfiler(B) enfiler(C) :

AVANT        ARRIÈRE
  ↓              ↓
┌───┬───┬───┐
│ A │ B │ C │
└───┴───┴───┘
  ↑
defiler() → A  (FIFO)

┌───┬───┐
│ B │ C │   → defiler() → B → ...
└───┴───┘`,
    complexite:{ temps_moy:"O(1)", temps_meil:"O(1)", temps_pire:"O(1)", espace:"O(n)", stable:null },
  },
  {
    id:11, chapitre:"structures", ordre:5,
    titre:"Arbre binaire de recherche (ABR)",
    resume:"Arbre ordonné : gauche < nœud < droite. Recherche en O(log n) si équilibré.",
    definition:`Dans un ABR, pour tout nœud n :
• Tous les nœuds du sous-arbre gauche ont une valeur < n
• Tous les nœuds du sous-arbre droit ont une valeur > n

Cette propriété permet la recherche dichotomique.

Cas dégénéré : si les données arrivent triées, l'arbre devient une liste chaînée → O(n). Les arbres équilibrés (AVL, Rouge-Noir) évitent ce problème.

Parcours :
• Infixe (gauche-racine-droite) : donne les valeurs triées`,
    code:`class Noeud:
    def __init__(self, val):
        self.val = val
        self.gauche = self.droite = None

class ABR:
    def __init__(self): self.racine = None

    def inserer(self, val):
        self.racine = self._inserer(self.racine, val)

    def _inserer(self, n, val):
        if not n: return Noeud(val)
        if val < n.val:   n.gauche = self._inserer(n.gauche, val)
        elif val > n.val: n.droite = self._inserer(n.droite, val)
        return n

    def rechercher(self, val):
        return self._rechercher(self.racine, val)

    def _rechercher(self, n, val):
        if not n or n.val == val: return n
        if val < n.val: return self._rechercher(n.gauche, val)
        return self._rechercher(n.droite, val)

    def infixe(self, n=None, premier=True):
        if premier: n = self.racine
        if n:
            self.infixe(n.gauche, False)
            print(n.val, end=" ")
            self.infixe(n.droite, False)`,
    schema:`Insertion de : 8, 3, 10, 1, 6, 14

        [8]
       /   \\
     [3]   [10]
    /   \\     \\
  [1]   [6]   [14]

Recherche de 6 :
  8 → 6 < 8, aller à gauche
  3 → 6 > 3, aller à droite
  6 → trouvé ✓  (3 comparaisons)

Parcours infixe : 1 3 6 8 10 14 (trié ✓)`,
    complexite:{ temps_moy:"O(log n)", temps_meil:"O(log n)", temps_pire:"O(n) dégénéré", espace:"O(n)", stable:null },
  },
  {
    id:12, chapitre:"structures", ordre:6,
    titre:"Tas min / Tas max (Heap)",
    resume:"Arbre binaire complet partiellement ordonné. Accès au min/max en O(1).",
    definition:`Un tas-min est un arbre binaire complet où chaque parent ≤ ses enfants. La racine est toujours le minimum.

Propriétés :
• Implémenté efficacement dans un tableau (parent de i = (i-1)//2)
• Insertion et extraction en O(log n)
• Construction d'un tas à partir d'un tableau : O(n)

Python fournit le module heapq (tas-min natif).

Applications :
• Files de priorité (Dijkstra, A*)
• Tri par tas (Heap Sort)
• Problèmes du "k-ième plus petit"`,
    code:`import heapq

# Tas-min avec heapq (Python natif)
tas = []
heapq.heappush(tas, 5)
heapq.heappush(tas, 2)
heapq.heappush(tas, 8)
heapq.heappush(tas, 1)

print(heapq.heappop(tas))   # → 1 (minimum)
print(heapq.heappop(tas))   # → 2

# Construction depuis une liste : O(n)
donnees = [3, 1, 8, 2, 9, 4]
heapq.heapify(donnees)       # Modifie en place

# K plus petits éléments
print(heapq.nsmallest(3, [5, 1, 8, 2, 9]))  # [1, 2, 5]

# Tas-max (simulé : stocker les valeurs négatives)
tas_max = []
for val in [3, 1, 8, 2]:
    heapq.heappush(tas_max, -val)
print(-heapq.heappop(tas_max))  # → 8`,
    schema:`Tas-min pour [3, 1, 8, 2, 9, 4] :

Arbre :       [1]
             /   \\
           [2]   [4]
           / \\   /
          [3][9][8]

Tableau : [1, 2, 4, 3, 9, 8]
index :    0  1  2  3  4  5
parent(i) = (i-1) // 2
gauche(i) = 2*i + 1
droite(i) = 2*i + 2`,
    complexite:{ temps_moy:"O(log n) push/pop", temps_meil:"O(1) peek", temps_pire:"O(log n)", espace:"O(n)", stable:null },
  },
  {
    id:13, chapitre:"structures", ordre:7,
    titre:"Table de hachage (dict Python)",
    resume:"Association clé→valeur en O(1) grâce à une fonction de hachage.",
    definition:`Une table de hachage mappe des clés à des valeurs via une fonction de hachage h(clé) → indice. Python dict est une implémentation très optimisée.

Gestion des collisions (même indice pour deux clés) :
• Chaînage : liste chaînée par case (Java HashMap)
• Adressage ouvert : chercher la prochaine case libre (Python dict)

Facteur de charge α = n/m (n=éléments, m=taille table). Si α > seuil → réhachage.

Points clés Python dict :
• Préserve l'ordre d'insertion (Python 3.7+)
• Réhachage automatique quand α > 2/3
• Clés doivent être hashables (immuables)`,
    code:`# dict Python = table de hachage optimisée
d = {}

# Insertion — O(1) amorti
d["alice"] = 28
d["bob"]   = 35
d["carol"] = 22

# Accès — O(1)
print(d["alice"])          # → 28

# Suppression — O(1)
del d["bob"]

# Vérification — O(1)
print("alice" in d)        # → True

# Implémentation manuelle (pédagogique)
class HashTable:
    def __init__(self, taille=101):
        self.taille = taille
        self.table = [[] for _ in range(taille)]

    def _hacher(self, cle):
        return hash(cle) % self.taille

    def inserer(self, cle, val):
        idx = self._hacher(cle)
        for item in self.table[idx]:
            if item[0] == cle:
                item[1] = val; return
        self.table[idx].append([cle, val])

    def obtenir(self, cle):
        idx = self._hacher(cle)
        for item in self.table[idx]:
            if item[0] == cle: return item[1]
        return None`,
    schema:`h("alice") → 42,  h("bob") → 17,  h("carol") → 42

Table de taille 101 :
  [17] → [("bob", 35)]
  [42] → [("alice", 28)] → [("carol", 22)]
                                ↑ collision gérée par chaînage

Adressage ouvert (Python) :
  [17] → "bob"
  [42] → "alice"
  [43] → "carol"  ← sonde linéaire/quadratique`,
    complexite:{ temps_moy:"O(1)", temps_meil:"O(1)", temps_pire:"O(n) collisions", espace:"O(n)", stable:null },
  },

  // ── GRAPHES ────────────────────────────────────────────────────────────────
  {
    id:14, chapitre:"graphes", ordre:1,
    titre:"Représentation d'un graphe",
    resume:"Matrice d'adjacence vs liste d'adjacence — compromis mémoire/vitesse.",
    definition:`Deux représentations principales :

1. Matrice d'adjacence (n×n) :
   • adj[i][j] = 1 si arête i→j
   • Vérifier une arête : O(1), Voisins de i : O(n)
   • Mémoire : O(n²) — mauvais pour graphes creux

2. Liste d'adjacence (dictionnaire/liste de listes) :
   • adj[i] = liste des voisins de i
   • Vérifier une arête : O(degré), Voisins : O(degré)
   • Mémoire : O(V + E) — idéal pour graphes creux

Règle pratique : liste d'adjacence par défaut sauf si E ≈ V².`,
    code:`# Liste d'adjacence (recommandée)
from collections import defaultdict

class Graphe:
    def __init__(self, oriente=False):
        self.adj = defaultdict(list)
        self.oriente = oriente

    def ajouter_arete(self, u, v, poids=1):
        self.adj[u].append((v, poids))
        if not self.oriente:
            self.adj[v].append((u, poids))

    def voisins(self, u):
        return self.adj[u]

# Création d'un graphe
g = Graphe()
g.ajouter_arete('A', 'B')
g.ajouter_arete('A', 'C')
g.ajouter_arete('B', 'D')
g.ajouter_arete('C', 'D')

print(g.voisins('A'))  # [('B',1), ('C',1)]

# Matrice d'adjacence
n = 4  # sommets 0,1,2,3
matrice = [[0]*n for _ in range(n)]
matrice[0][1] = 1  # Arête 0→1`,
    schema:`Graphe : A──B──D
               |  |
               C──┘

Liste d'adjacence :
  A : [B, C]
  B : [A, D]
  C : [A, D]
  D : [B, C]

Matrice d'adjacence :
     A  B  C  D
  A [0, 1, 1, 0]
  B [1, 0, 0, 1]
  C [1, 0, 0, 1]
  D [0, 1, 1, 0]`,
    complexite:{ temps_moy:"O(1) matrice", temps_meil:"O(V+E) liste", temps_pire:"O(n²) matrice mémoire", espace:"O(V+E)", stable:null },
  },
  {
    id:15, chapitre:"graphes", ordre:2,
    titre:"BFS — Parcours en largeur",
    resume:"Explore niveau par niveau. Trouve le plus court chemin (non pondéré).",
    definition:`BFS (Breadth-First Search) explore le graphe par niveaux en utilisant une file. Il visite d'abord tous les voisins directs d'un sommet, puis les voisins des voisins, etc.

Propriété clé : BFS trouve le plus court chemin (en nombre d'arêtes) dans un graphe non pondéré.

Applications :
• Plus court chemin non pondéré
• Calcul des composantes connexes
• Vérification si un graphe est biparti
• Niveau de séparation (ex: 6 degrés de séparation)`,
    code:`from collections import deque

def bfs(graphe, source):
    visite = {source}
    file = deque([source])
    distances = {source: 0}
    predecesseur = {source: None}

    while file:
        sommet = file.popleft()
        print(sommet, end=" ")

        for voisin, _ in graphe.adj[sommet]:
            if voisin not in visite:
                visite.add(voisin)
                file.append(voisin)
                distances[voisin] = distances[sommet] + 1
                predecesseur[voisin] = sommet

    return distances, predecesseur

def chemin_le_plus_court(graphe, src, dest):
    _, pred = bfs(graphe, src)
    chemin, sommet = [], dest
    while sommet: chemin.append(sommet); sommet = pred[sommet]
    return chemin[::-1]`,
    schema:`Graphe : A──B──E
               |  |
               C──D

BFS depuis A :
  File : [A]          Visités : {A}
  Dépiler A → voisins B, C
  File : [B, C]       Visités : {A,B,C}  niveau 1
  Dépiler B → voisins E, D
  File : [C, E, D]    visités : {A,B,C,E,D}
  Dépiler C → plus de nouveaux voisins
  ...

Ordre de visite : A → B → C → E → D
Distances depuis A : B=1, C=1, E=2, D=2`,
    complexite:{ temps_moy:"O(V + E)", temps_meil:"O(V + E)", temps_pire:"O(V + E)", espace:"O(V)", stable:null },
  },
  {
    id:16, chapitre:"graphes", ordre:3,
    titre:"DFS — Parcours en profondeur",
    resume:"Explore le plus loin possible avant de revenir en arrière. Récursif ou itératif.",
    definition:`DFS (Depth-First Search) explore chaque branche aussi loin que possible avant de revenir. Utilise une pile (récursion implicite ou pile explicite).

Applications :
• Détection de cycles
• Tri topologique (graphes orientés acycliques)
• Composantes fortement connexes (Tarjan, Kosaraju)
• Résolution de labyrinthes / backtracking
• Génération d'arbres couvrants`,
    code:`def dfs_recursif(graphe, sommet, visite=None):
    if visite is None: visite = set()
    visite.add(sommet)
    print(sommet, end=" ")
    for voisin, _ in graphe.adj[sommet]:
        if voisin not in visite:
            dfs_recursif(graphe, voisin, visite)
    return visite

def dfs_iteratif(graphe, source):
    visite = set()
    pile = [source]
    while pile:
        sommet = pile.pop()
        if sommet not in visite:
            visite.add(sommet)
            print(sommet, end=" ")
            for voisin, _ in graphe.adj[sommet]:
                if voisin not in visite:
                    pile.append(voisin)

# Détection de cycle
def a_un_cycle(graphe, source, visite=None, en_cours=None):
    if visite is None: visite, en_cours = set(), set()
    visite.add(source); en_cours.add(source)
    for voisin, _ in graphe.adj[source]:
        if voisin in en_cours: return True
        if voisin not in visite:
            if a_un_cycle(graphe, voisin, visite, en_cours): return True
    en_cours.remove(source)
    return False`,
    schema:`Graphe : A──B──E
               |  |
               C──D

DFS depuis A (récursif) :
  Visiter A → aller à B
    Visiter B → aller à E
      Visiter E → plus de voisins, retour
    Retour B → aller à D
      Visiter D → aller à C
        Visiter C → plus de nouveaux, retour
      Retour D
    Retour B, retour A

Ordre : A → B → E → D → C`,
    complexite:{ temps_moy:"O(V + E)", temps_meil:"O(V + E)", temps_pire:"O(V + E)", espace:"O(V)", stable:null },
  },
  {
    id:17, chapitre:"graphes", ordre:4,
    titre:"Algorithme de Dijkstra",
    resume:"Plus court chemin source→tous dans un graphe pondéré à poids positifs.",
    definition:`Dijkstra maintient un ensemble de distances provisoires et les améliore itérativement. Il extrait toujours le sommet non visité le plus proche.

Principe (algorithme glouton) :
1. dist[source] = 0, dist[autres] = ∞
2. Extraire le sommet u de distance minimale
3. Pour chaque voisin v de u : si dist[u] + w(u,v) < dist[v], mettre à jour
4. Répéter jusqu'à traiter tous les sommets

Prérequis : poids d'arêtes positifs (sinon → Bellman-Ford)`,
    code:`import heapq

def dijkstra(graphe, source):
    dist = {s: float('inf') for s in graphe.adj}
    dist[source] = 0
    pred = {source: None}
    file_prio = [(0, source)]  # (distance, sommet)

    while file_prio:
        d, u = heapq.heappop(file_prio)
        if d > dist[u]: continue  # Entrée périmée

        for v, poids in graphe.adj[u]:
            nouvelle_dist = dist[u] + poids
            if nouvelle_dist < dist[v]:
                dist[v] = nouvelle_dist
                pred[v] = u
                heapq.heappush(file_prio, (nouvelle_dist, v))

    return dist, pred

def reconstruire_chemin(pred, dest):
    chemin, s = [], dest
    while s: chemin.append(s); s = pred.get(s)
    return chemin[::-1]`,
    schema:`Graphe pondéré :
    A --2-- B --1-- E
    |       |
    4       3
    |       |
    C --1-- D

Depuis A :
  Étape 1 : dist={A:0, B:∞, C:∞, D:∞, E:∞}
  Traiter A : dist[B]=2, dist[C]=4
  Traiter B (dist=2) : dist[E]=3, dist[D]=5
  Traiter E (dist=3) : rien de mieux
  Traiter C (dist=4) : dist[D]=5 (pas mieux)
  Traiter D (dist=5)

  Résultat : A=0, B=2, C=4, D=5, E=3`,
    complexite:{ temps_moy:"O((V+E) log V)", temps_meil:"O((V+E) log V)", temps_pire:"O((V+E) log V)", espace:"O(V)", stable:null },
  },
  {
    id:18, chapitre:"graphes", ordre:5,
    titre:"Bellman-Ford",
    resume:"Plus court chemin avec poids négatifs. Détecte les cycles négatifs.",
    definition:`Bellman-Ford relaxe toutes les arêtes V-1 fois. Contrairement à Dijkstra, il gère les poids négatifs. Une V-ième relaxation qui améliore encore une distance signale un cycle négatif.

Avantages vs Dijkstra :
• Gère les poids négatifs
• Détecte les cycles négatifs
• Plus simple à implémenter

Inconvénient :
• Plus lent : O(V × E) vs O((V+E) log V)`,
    code:`def bellman_ford(sommets, aretes, source):
    # aretes = liste de (u, v, poids)
    dist = {s: float('inf') for s in sommets}
    dist[source] = 0
    pred = {source: None}

    # V-1 relaxations
    for _ in range(len(sommets) - 1):
        for u, v, poids in aretes:
            if dist[u] != float('inf') and dist[u] + poids < dist[v]:
                dist[v] = dist[u] + poids
                pred[v] = u

    # Détection de cycle négatif
    for u, v, poids in aretes:
        if dist[u] != float('inf') and dist[u] + poids < dist[v]:
            raise ValueError("Cycle négatif détecté !")

    return dist, pred

# Exemple
sommets = ['A','B','C','D']
aretes  = [('A','B', 1),('B','C',-3),('C','D', 2),('A','D', 4)]
print(bellman_ford(sommets, aretes, 'A'))`,
    schema:`Graphe avec poids négatif :
  A --1-→ B --(-3)-→ C --2-→ D

Initialisation : A=0, B=∞, C=∞, D=∞

Relaxation 1 :
  A→B : dist[B] = 0+1 = 1
  B→C : dist[C] = 1-3 = -2
  C→D : dist[D] = -2+2 = 0
  A→D : dist[D] = min(0, 4) = 0

Résultat : A=0, B=1, C=-2, D=0`,
    complexite:{ temps_moy:"O(V × E)", temps_meil:"O(E)", temps_pire:"O(V × E)", espace:"O(V)", stable:null },
  },

  // ── RÉCURSIVITÉ ────────────────────────────────────────────────────────────
  {
    id:19, chapitre:"recursivite", ordre:1,
    titre:"Principes de la récursivité",
    resume:"Toute fonction récursive nécessite un cas de base et un cas récursif convergeant.",
    definition:`Une fonction est récursive si elle s'appelle elle-même. Toute récursion correcte doit avoir :

1. Cas de base : condition d'arrêt (sans appel récursif)
2. Cas récursif : s'appelle avec un sous-problème strictement plus petit

La pile d'appels (call stack) mémorise chaque appel en cours. Trop d'appels imbriqués → RecursionError (stack overflow).

Python : limite par défaut à 1000 appels (sys.setrecursionlimit()).

Types de récursivité :
• Récursivité simple : un seul appel récursif
• Récursivité multiple : plusieurs appels (Fibonacci, Merge Sort)
• Récursivité terminale : appel récursif = dernière instruction`,
    code:`import sys
sys.setrecursionlimit(10000)  # Augmenter si nécessaire

# Récursivité simple
def somme(n):
    if n == 0: return 0          # Cas de base
    return n + somme(n - 1)      # Cas récursif

# Récursivité terminale (optimisable en itératif)
def somme_ter(n, acc=0):
    if n == 0: return acc
    return somme_ter(n - 1, acc + n)

# Récursivité mutuelle
def est_pair(n):
    if n == 0: return True
    return est_impair(n - 1)

def est_impair(n):
    if n == 0: return False
    return est_pair(n - 1)

# Conversion récursion → itératif
def somme_iter(n):
    acc = 0
    while n > 0:
        acc += n; n -= 1
    return acc`,
    schema:`Pile d'appels pour somme(4) :

  somme(4) → en attente de somme(3)
    somme(3) → en attente de somme(2)
      somme(2) → en attente de somme(1)
        somme(1) → en attente de somme(0)
          somme(0) = 0   ← cas de base

  Dépliage (retours) :
    somme(1) = 1 + 0 = 1
    somme(2) = 2 + 1 = 3
    somme(3) = 3 + 3 = 6
    somme(4) = 4 + 6 = 10 ✓`,
    complexite:{ temps_moy:"Selon l'algo", temps_meil:"—", temps_pire:"—", espace:"O(profondeur)", stable:null },
  },
  {
    id:20, chapitre:"recursivite", ordre:2,
    titre:"Factorielle",
    resume:"n! = n × (n-1)! Exemple canonique de récursivité simple.",
    definition:`La factorielle de n est le produit de tous les entiers de 1 à n. C'est l'exemple de base pour illustrer la récursivité.

n! = n × (n-1) × ... × 2 × 1 = n × (n-1)!
0! = 1  (cas de base)

Intérêt pédagogique : montrer la correspondance directe entre définition mathématique et code récursif.

Comparaison récursif vs itératif : les deux ont la même complexité, mais la version itérative est plus efficace en pratique (pas de surcoût de la pile d'appels).`,
    code:`# Version récursive
def factorielle(n):
    if n < 0:
        raise ValueError("Pas de factorielle pour n < 0")
    if n == 0 or n == 1:
        return 1             # Cas de base
    return n * factorielle(n - 1)

# Version itérative (plus efficace)
def factorielle_iter(n):
    resultat = 1
    for i in range(2, n + 1):
        resultat *= i
    return resultat

# Python natif
import math
print(math.factorial(10))   # → 3628800

# Tests
for i in range(8):
    print(f"{i}! = {factorielle(i)}")
# 0!=1, 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040`,
    schema:`factorielle(5) :

  fact(5) = 5 × fact(4)
               = 5 × 4 × fact(3)
                        = 5 × 4 × 3 × fact(2)
                                     = 5×4×3×2×fact(1)
                                                = 5×4×3×2×1
  Résultat : 120

Pile d'appels (max n=5 niveaux) :
┌──────────┐
│ fact(1)=1│ ← sommet
├──────────┤
│ fact(2)  │
├──────────┤
│ fact(3)  │
├──────────┤
│ fact(4)  │
├──────────┤
│ fact(5)  │ ← bas
└──────────┘`,
    complexite:{ temps_moy:"O(n)", temps_meil:"O(n)", temps_pire:"O(n)", espace:"O(n)", stable:null },
  },
  {
    id:21, chapitre:"recursivite", ordre:3,
    titre:"Fibonacci & Mémoïsation",
    resume:"F(n)=F(n-1)+F(n-2). Version naïve O(2ⁿ), mémoïsation O(n).",
    definition:`La suite de Fibonacci illustre parfaitement le problème des sous-problèmes redondants et la solution par mémoïsation (ou programmation dynamique).

Version naïve : recalcule les mêmes valeurs des millions de fois → O(2ⁿ).

Mémoïsation : stocker le résultat de chaque appel → chaque valeur calculée une seule fois → O(n).

Python fournit @functools.lru_cache pour la mémoïsation automatique.`,
    code:`# Version naïve — O(2ⁿ) — très lente
def fib_naif(n):
    if n <= 1: return n
    return fib_naif(n-1) + fib_naif(n-2)

# Mémoïsation manuelle — O(n)
def fib_memo(n, cache={}):
    if n in cache: return cache[n]
    if n <= 1: return n
    cache[n] = fib_memo(n-1, cache) + fib_memo(n-2, cache)
    return cache[n]

# Avec décorateur Python — O(n)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Version itérative — O(n) temps, O(1) espace
def fib_iter(n):
    a, b = 0, 1
    for _ in range(n): a, b = b, a + b
    return a

print([fib_iter(i) for i in range(10)])
# → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    schema:`fib(5) SANS mémoïsation — arbre des appels :
             fib(5)
           /       \\
       fib(4)      fib(3) ←── calculé 2× !
       /    \\      /   \\
   fib(3) fib(2) fib(2) fib(1)
   /   \\    ...   /   \\
fib(2) fib(1) fib(1) fib(0)

fib(5) AVEC mémoïsation :
  fib(5) → fib(4) → fib(3) → fib(2) → fib(1)=1
                                      → fib(0)=0
                                    ← cache[2]=1
                              ← cache[3]=2
                    ← cache[4]=3
  fib(5) → cache[3]=2 (lecture directe)
  ← cache[5]=5`,
    complexite:{ temps_moy:"O(n) mémo", temps_meil:"O(n)", temps_pire:"O(2ⁿ) naïf", espace:"O(n)", stable:null },
  },
  {
    id:22, chapitre:"recursivite", ordre:4,
    titre:"Tours de Hanoï",
    resume:"Déplace n disques de A vers C via B. 2ⁿ-1 déplacements nécessaires.",
    definition:`Les Tours de Hanoï illustrent la puissance de la pensée récursive. Avec 3 tiges (A, B, C) et n disques de tailles différentes :

Règles :
• Déplacer un seul disque à la fois
• Un grand disque ne peut jamais être posé sur un petit

Algorithme récursif en 3 étapes :
1. Déplacer les n-1 disques supérieurs de A vers B (via C)
2. Déplacer le disque n (le plus grand) de A vers C
3. Déplacer les n-1 disques de B vers C (via A)

Le nombre de mouvements minimal est exactement 2ⁿ - 1.`,
    code:`def hanoi(n, source, destination, auxiliaire):
    if n == 1:
        print(f"Disque 1 : {source} → {destination}")
        return
    # Étape 1 : déplacer n-1 disques vers auxiliaire
    hanoi(n-1, source, auxiliaire, destination)
    # Étape 2 : déplacer le plus grand disque
    print(f"Disque {n} : {source} → {destination}")
    # Étape 3 : déplacer n-1 disques vers destination
    hanoi(n-1, auxiliaire, destination, source)

def compter_mouvements(n):
    return 2**n - 1

# Exemple avec 3 disques
hanoi(3, 'A', 'C', 'B')
print(f"Total mouvements : {compter_mouvements(3)}")  # → 7

# Output :
# Disque 1 : A → C
# Disque 2 : A → B
# Disque 1 : C → B
# Disque 3 : A → C
# Disque 1 : B → A
# Disque 2 : B → C
# Disque 1 : A → C`,
    schema:`n=3 disques :  A→C (via B)

État initial :     A      B      C
                  [1]
                  [2]
                  [3]

Étape 1 (hanoi(2,A,B,C)) : déplacer 1,2 vers B
État :             A      B      C
                  [3]   [1]
                         [2]

Étape 2 : déplacer [3] vers C
                   A      B      C
                         [1]   [3]
                         [2]

Étape 3 (hanoi(2,B,C,A)) : déplacer 1,2 vers C
                   A      B      C
                                [1]
                                [2]
                                [3]  ✓

Mouvements : 2³ - 1 = 7`,
    complexite:{ temps_moy:"O(2ⁿ)", temps_meil:"O(2ⁿ)", temps_pire:"O(2ⁿ)", espace:"O(n)", stable:null },
  },

  // ── RECHERCHE ──────────────────────────────────────────────────────────────
  {
    id:23, chapitre:"recherche", ordre:1,
    titre:"Recherche linéaire",
    resume:"Parcourt chaque élément un par un. O(n), fonctionne sur tout tableau.",
    definition:`La recherche linéaire (ou séquentielle) examine chaque élément du tableau jusqu'à trouver la cible ou atteindre la fin.

Quand l'utiliser :
• Tableau non trié
• Recherche unique (pas la peine de trier pour une seule recherche)
• Petits tableaux
• Données en flux (streaming)

En Python, l'opérateur "in" sur une liste effectue une recherche linéaire : O(n). Sur un set ou dict, c'est O(1).`,
    code:`def recherche_lineaire(tab, cible):
    for i, val in enumerate(tab):
        if val == cible:
            return i   # Retourne l'indice
    return -1           # Non trouvé

# Recherche de toutes les occurrences
def toutes_occurrences(tab, cible):
    return [i for i, val in enumerate(tab) if val == cible]

# Trouver le minimum et maximum — O(n)
def min_max(tab):
    if not tab: return None, None
    min_val = max_val = tab[0]
    for val in tab[1:]:
        if val < min_val: min_val = val
        if val > max_val: max_val = val
    return min_val, max_val

# Comparaison Python natif
tab = [3, 7, 1, 9, 4]
print(3 in tab)         # True — recherche linéaire O(n)
print({3,7,1,9,4})      # set
print(3 in {3,7,1,9,4}) # True — hachage O(1)`,
    schema:`Chercher 7 dans [3, 9, 2, 7, 5] :

index :  0    1    2    3    4
       [ 3 ][ 9 ][ 2 ][ 7 ][ 5 ]
         ↑
         3 ≠ 7

       [ 3 ][ 9 ][ 2 ][ 7 ][ 5 ]
              ↑
              9 ≠ 7

       [ 3 ][ 9 ][ 2 ][ 7 ][ 5 ]
                    ↑
                    2 ≠ 7

       [ 3 ][ 9 ][ 2 ][ 7 ][ 5 ]
                         ↑
                         7 = 7 ✓  → retourne 3`,
    complexite:{ temps_moy:"O(n)", temps_meil:"O(1)", temps_pire:"O(n)", espace:"O(1)", stable:null },
  },
  {
    id:24, chapitre:"recherche", ordre:2,
    titre:"Recherche binaire (Dichotomie)",
    resume:"Sur tableau trié, élimine la moitié à chaque étape. O(log n).",
    definition:`La recherche binaire exploite le fait que le tableau est trié. À chaque étape, elle compare la cible avec l'élément médian et élimine la moitié du tableau restant.

Condition préalable : le tableau DOIT être trié.

Invariant : la cible est dans tab[gauche..droite] si elle existe.

Variants importants :
• Trouver la première occurrence d'une valeur (bisect_left)
• Trouver la dernière occurrence (bisect_right)
• Trouver la position d'insertion`,
    code:`def recherche_binaire(tab, cible):
    gauche, droite = 0, len(tab) - 1
    while gauche <= droite:
        milieu = gauche + (droite - gauche) // 2  # Évite overflow
        if tab[milieu] == cible:
            return milieu        # Trouvé
        elif tab[milieu] < cible:
            gauche = milieu + 1  # Chercher à droite
        else:
            droite = milieu - 1  # Chercher à gauche
    return -1                    # Non trouvé

# Version récursive
def recherche_bin_rec(tab, cible, g=0, d=None):
    if d is None: d = len(tab) - 1
    if g > d: return -1
    m = (g + d) // 2
    if tab[m] == cible: return m
    if tab[m] < cible: return recherche_bin_rec(tab, cible, m+1, d)
    return recherche_bin_rec(tab, cible, g, m-1)

# Module Python natif : bisect
import bisect
tab = [1, 3, 5, 7, 9, 11]
print(bisect.bisect_left(tab, 7))   # → 3 (indice)
print(bisect.bisect_right(tab, 7))  # → 4 (après)`,
    schema:`Chercher 7 dans [1, 3, 5, 7, 9, 11, 13] (n=7)

Étape 1 : g=0, d=6, m=3 → tab[3]=7 = cible ✓
          Trouvé en 1 étape !

Chercher 11 :
Étape 1 : g=0, d=6, m=3 → tab[3]=7 < 11 → g=4
Étape 2 : g=4, d=6, m=5 → tab[5]=11 = cible ✓

Chercher 4 :
Étape 1 : m=3 → 7 > 4 → d=2
Étape 2 : m=1 → 3 < 4 → g=2
Étape 3 : m=2 → 5 > 4 → d=1
Étape 4 : g=2 > d=1 → retourner -1

log₂(7) ≈ 2.8 → max 3 étapes`,
    complexite:{ temps_moy:"O(log n)", temps_meil:"O(1)", temps_pire:"O(log n)", espace:"O(1)", stable:null },
  },

  // ── COMPLEXITÉ ─────────────────────────────────────────────────────────────
  {
    id:25, chapitre:"complexite", ordre:1,
    titre:"Notation Big O — Fondamentaux",
    resume:"Mesure la croissance du temps en fonction de n. On ignore constantes et termes dominés.",
    definition:`La notation Big O décrit le comportement asymptotique d'un algorithme : comment son temps d'exécution croît quand n → ∞.

Règles de simplification :
• On ignore les constantes : O(2n) = O(n)
• On garde le terme dominant : O(n² + n) = O(n²)
• On analyse le pire cas (sauf mention contraire)

Hiérarchie des complexités (du meilleur au pire) :
O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)`,
    code:`# O(1) — constant : ne dépend pas de n
def premier_element(tab):
    return tab[0]

# O(log n) — logarithmique : divise par 2 à chaque étape
def recherche_binaire(tab, cible):
    g, d = 0, len(tab)-1
    while g <= d:
        m = (g+d)//2
        if tab[m] == cible: return m
        elif tab[m] < cible: g = m+1
        else: d = m-1

# O(n) — linéaire : parcourt chaque élément
def somme(tab):
    return sum(tab)   # ou : s=0; for x in tab: s+=x

# O(n log n) — quasi-linéaire
def tri(tab): return sorted(tab)  # Timsort

# O(n²) — quadratique : boucle imbriquée sur n
def toutes_paires(tab):
    return [(tab[i], tab[j]) for i in range(len(tab))
                             for j in range(len(tab))]

# O(2ⁿ) — exponentiel : à éviter !
def fib_naif(n):
    if n <= 1: return n
    return fib_naif(n-1) + fib_naif(n-2)`,
    schema:`Nombre d'opérations pour n = 1 000 :

O(1)       →               1 op
O(log n)   →              10 ops
O(√n)      →              32 ops
O(n)       →           1 000 ops
O(n log n) →          10 000 ops
O(n²)      →       1 000 000 ops
O(2ⁿ)      → 10^301 ops  ← impossible en pratique !

Règles :
  3n² + 5n + 12  →  O(n²)    (terme dominant)
  n/2            →  O(n)     (constante ignorée)
  log₂n = log₁₀n × 3.32 → même classe O(log n)`,
    complexite:{ temps_moy:"—", temps_meil:"—", temps_pire:"—", espace:"—", stable:null },
  },
  {
    id:26, chapitre:"complexite", ordre:2,
    titre:"Théorème Maître",
    resume:"Résout T(n) = aT(n/b) + f(n), typique des algorithmes Diviser pour Régner.",
    definition:`Le Théorème Maître donne la complexité des récurrences de la forme :
T(n) = a·T(n/b) + O(nᵏ)

où a ≥ 1, b > 1, k ≥ 0 sont des constantes.

Trois cas selon la comparaison entre log_b(a) et k :
• Cas 1 : log_b(a) > k → T(n) = O(n^log_b(a))
• Cas 2 : log_b(a) = k → T(n) = O(nᵏ · log n)
• Cas 3 : log_b(a) < k → T(n) = O(nᵏ)

Intuition : compare le travail fait à chaque niveau (f(n)) avec le travail dans les sous-problèmes.`,
    code:`# Tri Fusion : T(n) = 2T(n/2) + O(n)
# a=2, b=2, k=1
# log_b(a) = log_2(2) = 1 = k  → Cas 2
# T(n) = O(n¹ · log n) = O(n log n)  ✓

def tri_fusion(tab):  # O(n log n)
    if len(tab) <= 1: return tab
    m = len(tab) // 2
    return fusionner(tri_fusion(tab[:m]), tri_fusion(tab[m:]))

# Recherche binaire : T(n) = T(n/2) + O(1)
# a=1, b=2, k=0
# log_2(1) = 0 = k  → Cas 2
# T(n) = O(n⁰ · log n) = O(log n)  ✓

# Algorithme cubique hypothétique : T(n) = 8T(n/2) + O(n²)
# a=8, b=2, k=2
# log_2(8) = 3 > 2  → Cas 1
# T(n) = O(n³)

# Vérification rapide :
def cas_theoreme_maitre(a, b, k):
    from math import log2
    c = log2(a) / log2(b)  # log_b(a)
    if c > k:   return f"Cas 1 : O(n^{c:.2f})"
    elif c == k: return f"Cas 2 : O(n^{k} log n)"
    else:        return f"Cas 3 : O(n^{k})"`,
    schema:`T(n) = a·T(n/b) + nᵏ

         Niveau 0 :  nᵏ travail          (1 appel)
         Niveau 1 :  a·(n/b)ᵏ travail   (a appels)
         Niveau 2 :  a²·(n/b²)ᵏ travail (a² appels)
         ...
         Niveau log_b(n) : feuilles (nˡᵒᵍᵇᵃ feuilles)

Exemples concrets :
  Merge Sort  : a=2,b=2,k=1 → cas 2 → O(n log n)
  Quick Sort  : a=2,b=2,k=1 → cas 2 → O(n log n)
  Bin. Search : a=1,b=2,k=0 → cas 2 → O(log n)
  Naive Matrix: a=8,b=2,k=2 → cas 1 → O(n^2.81)`,
    complexite:{ temps_moy:"—", temps_meil:"—", temps_pire:"—", espace:"—", stable:null },
  },
  {
    id:27, chapitre:"complexite", ordre:3,
    titre:"Complexité spatiale & analyse amortie",
    resume:"Mémoire utilisée et coût moyen sur une séquence d'opérations.",
    definition:`Complexité spatiale : quantité de mémoire supplémentaire utilisée en fonction de n.
• O(1) : en-place (tri par insertion, bulles, sélection)
• O(log n) : récursion sans tableau (quicksort)
• O(n) : tableau auxiliaire (merge sort, BFS, DFS)

Analyse amortie : coût moyen d'une opération sur une longue séquence.

Exemple : list.append() en Python
• Cas normal : O(1) (juste écrire dans la case)
• Cas de réallocation : O(n) (copier tout le tableau)
• Mais la réallocation est rare → coût amorti O(1)

Méthodes d'analyse amortie :
• Méthode de l'agrégat
• Méthode du potentiel (Tarjan)`,
    code:`import sys

# Visualiser la complexité spatiale
def espace_recursion(n):
    """O(n) espace — n appels empilés"""
    if n == 0: return 0
    return 1 + espace_recursion(n - 1)

def espace_iteratif(n):
    """O(1) espace — pas d'empilement"""
    acc = 0
    while n > 0: acc += 1; n -= 1
    return acc

# Démontrer le coût amorti de list.append
tab = []
for i in range(1, 17):
    avant = sys.getsizeof(tab)
    tab.append(i)
    apres = sys.getsizeof(tab)
    if apres != avant:
        print(f"Réallocation à n={i}: {avant}→{apres} octets")

# Complexité spatiale comparative
# Tri insertion  : O(1) — en place
# Tri fusion     : O(n) — tableau temporaire
# BFS            : O(V) — file des sommets
# Mémoïsation   : O(n) — dictionnaire de cache`,
    schema:`Réallocation dans une liste dynamique :

n éléments | capacité | coût append
    0      |    0     |  O(n) réalloc → capacité=4
    4      |    4     |  O(n) réalloc → capacité=8
    8      |    8     |  O(n) réalloc → capacité=16
   16      |   16     |  O(n) réalloc → capacité=32

Sur 32 appels : 0+4+8+16 = 28 copies
Coût total = 32 × O(1) + 28 copies ≈ O(n)
Coût AMORTI par opération = O(n)/n = O(1) ✓`,
    complexite:{ temps_moy:"O(1) amorti", temps_meil:"O(1)", temps_pire:"O(n) réalloc", espace:"O(n)", stable:null },
  },
];

// ─── Questions Quiz ───────────────────────────────────────────────────────────
const QUESTIONS = [
  // ── TEXTE ────────────────────────────────────────────────────────────────
  { id:1, type:"texte", question:"Quelle est la complexité temporelle dans le pire cas du tri à bulles ?", options:["O(n)","O(n log n)","O(n²)","O(log n)"], correct:2, explication:"Le tri à bulles compare chaque paire d'éléments adjacents à chaque passe → n×(n-1)/2 comparaisons → O(n²)." },
  { id:2, type:"texte", question:"Quel algorithme de tri garantit O(n log n) dans tous les cas et est stable ?", options:["Tri rapide","Tri par tas","Tri fusion","Tri par insertion"], correct:2, explication:"Le tri fusion divise récursivement et fusionne — O(n log n) garanti et stable. Le tri rapide est O(n²) dans le pire cas et instable." },
  { id:3, type:"texte", question:"Quelle structure de données utilise le principe LIFO ?", options:["File (Queue)","Liste chaînée","Pile (Stack)","Arbre binaire"], correct:2, explication:"LIFO = Last In, First Out. La pile empile et dépile par le sommet. La file utilise FIFO." },
  { id:4, type:"texte", question:"Dans un arbre binaire de recherche, où se trouve le minimum ?", options:["À la racine","Dans le sous-arbre droit le plus profond","Dans le sous-arbre gauche le plus profond","Au niveau intermédiaire"], correct:2, explication:"Dans un ABR, les valeurs inférieures sont toujours à gauche. Le minimum est le nœud le plus à gauche." },
  { id:5, type:"texte", question:"Quel parcours de graphe utilise une file (Queue) ?", options:["DFS","BFS","Dijkstra","Bellman-Ford"], correct:1, explication:"BFS utilise une file pour explorer niveau par niveau. DFS utilise une pile (ou la récursion)." },
  { id:6, type:"texte", question:"Quelle est la précondition obligatoire pour utiliser la recherche binaire ?", options:["Le tableau doit être trié","Le tableau doit être de taille paire","Les éléments doivent être des entiers","Le tableau doit être en RAM"], correct:0, explication:"La recherche binaire compare avec l'élément médian et élimine la moitié — cela ne fonctionne que sur un tableau trié." },
  { id:7, type:"texte", question:"Quel algorithme détecte les cycles négatifs dans un graphe ?", options:["Dijkstra","BFS","Bellman-Ford","DFS"], correct:2, explication:"Bellman-Ford relaxe toutes les arêtes V-1 fois. Une V-ième relaxation améliorante signale un cycle négatif." },
  { id:8, type:"texte", question:"Dans les Tours de Hanoï avec n disques, combien de mouvements faut-il au minimum ?", options:["n²","2n − 1","n log n","2ⁿ − 1"], correct:3, explication:"La récurrence T(n) = 2T(n-1) + 1 donne T(n) = 2ⁿ - 1. Pour 10 disques : 1023 mouvements." },
  { id:9, type:"texte", question:"Quelle est la complexité du tri par insertion sur un tableau déjà trié ?", options:["O(n²)","O(n log n)","O(n)","O(1)"], correct:2, explication:"Sur un tableau trié, la condition while n'est jamais vraie → exactement n-1 comparaisons → O(n). C'est son meilleur cas." },
  { id:10, type:"texte", question:"Quelle structure Python utiliser pour implémenter une file efficacement ?", options:["list avec pop(0)","collections.deque","set","tuple"], correct:1, explication:"list.pop(0) est O(n) car il décale tous les éléments. collections.deque garantit O(1) des deux côtés." },
  { id:11, type:"texte", question:"Quelle complexité a heapify() sur une liste de n éléments ?", options:["O(n log n)","O(n)","O(log n)","O(n²)"], correct:1, explication:"Heapify utilise une technique ascendante sur les nœuds internes → O(n) prouvé mathématiquement, pas O(n log n)." },
  { id:12, type:"texte", question:"Dans le Théorème Maître, si T(n) = 2T(n/2) + O(n), quelle est la solution ?", options:["O(n)","O(n log n)","O(n²)","O(log n)"], correct:1, explication:"a=2, b=2, k=1 → log₂(2)=1=k → Cas 2 → T(n) = O(n log n). C'est la complexité du tri fusion." },

  // ── QUE RETOURNE CE CODE ? ────────────────────────────────────────────────
  {
    id:13, type:"retour",
    question:"Que retourne cette fonction appelée avec f(5) ?",
    code:`def f(n):
    if n <= 1:
        return n
    return f(n-1) + f(n-2)

print(f(5))`,
    options:["3","5","8","13"],
    correct:1,
    explication:"f est Fibonacci. f(5) = f(4)+f(3) = (f(3)+f(2))+(f(2)+f(1)) = (2+1)+(1+1) = 5."
  },
  {
    id:14, type:"retour",
    question:"Que va afficher ce code ?",
    code:`tab = [3, 1, 4, 1, 5, 9, 2, 6]
resultat = [x for x in tab if x > 3]
print(resultat)`,
    options:["[3, 4, 5, 9, 6]","[4, 5, 9, 6]","[4, 5, 9, 2, 6]","[1, 1, 2]"],
    correct:1,
    explication:"La compréhension filtre les éléments strictement supérieurs à 3. Dans [3,1,4,1,5,9,2,6] : 4, 5, 9 et 6 passent le filtre. 3 est exclu car x > 3 (strict)."
  },
  {
    id:15, type:"retour",
    question:"Quelle est la valeur finale de 'resultat' ?",
    code:`from collections import deque

pile = []
pile.append(10)
pile.append(20)
pile.append(30)
pile.pop()
pile.append(40)
resultat = pile[-1]`,
    options:["30","20","40","10"],
    correct:2,
    explication:"push(10), push(20), push(30), pop() → retire 30, push(40). La pile est [10, 20, 40]. Le sommet pile[-1] = 40."
  },
  {
    id:16, type:"retour",
    question:"Que retourne cette fonction avec recherche([1,3,5,7,9], 7) ?",
    code:`def recherche(tab, cible):
    g, d = 0, len(tab) - 1
    while g <= d:
        m = (g + d) // 2
        if tab[m] == cible:
            return m
        elif tab[m] < cible:
            g = m + 1
        else:
            d = m - 1
    return -1`,
    options:["2","3","4","-1"],
    correct:1,
    explication:"Tableau [1,3,5,7,9], cherche 7. Étape 1: m=2→tab[2]=5<7→g=3. Étape 2: m=3→tab[3]=7=cible → retourne 3."
  },
  {
    id:17, type:"retour",
    question:"Que retourne mystery([5, 3, 8, 1, 9]) ?",
    code:`def mystery(tab):
    if not tab:
        return None
    m = tab[0]
    for x in tab[1:]:
        if x < m:
            m = x
    return m`,
    options:["9","5","1","3"],
    correct:2,
    explication:"La fonction parcourt le tableau et garde la valeur minimale. Elle compare chaque élément avec m et met à jour si plus petit. Minimum de [5,3,8,1,9] = 1."
  },
  {
    id:18, type:"retour",
    question:"Quelle est la sortie de ce programme ?",
    code:`def factorielle(n):
    if n == 0:
        return 1
    return n * factorielle(n - 1)

print(factorielle(0) + factorielle(3))`,
    options:["6","7","4","1"],
    correct:1,
    explication:"factorielle(0) = 1 (cas de base). factorielle(3) = 3×2×1 = 6. Résultat : 1 + 6 = 7."
  },

  // ── COMPLEXITÉ DE CE CODE ? ───────────────────────────────────────────────
  {
    id:19, type:"complexite",
    question:"Quelle est la complexité temporelle de cette fonction ?",
    code:`def traiter(tab):
    n = len(tab)
    for i in range(n):
        for j in range(n):
            print(tab[i] + tab[j])`,
    options:["O(n)","O(n log n)","O(n²)","O(2n)"],
    correct:2,
    explication:"Deux boucles imbriquées de taille n → n × n = n² opérations → O(n²). Typique des algorithmes quadratiques comme le tri à bulles."
  },
  {
    id:20, type:"complexite",
    question:"Quelle est la complexité de cette fonction récursive ?",
    code:`def diviser(n):
    if n <= 1:
        return
    diviser(n // 2)
    diviser(n // 2)`,
    options:["O(n)","O(log n)","O(n log n)","O(n²)"],
    correct:0,
    explication:"T(n) = 2T(n/2) + O(1). Par le Théorème Maître : a=2, b=2, k=0. log₂(2)=1 > 0 → Cas 1 → O(n^1) = O(n)."
  },
  {
    id:21, type:"complexite",
    question:"Quelle est la complexité de cet algorithme de recherche ?",
    code:`def chercher(tab, cible):
    g, d = 0, len(tab) - 1
    while g <= d:
        m = (g + d) // 2
        if tab[m] == cible: return m
        elif tab[m] < cible: g = m + 1
        else: d = m - 1
    return -1`,
    options:["O(1)","O(log n)","O(n)","O(n log n)"],
    correct:1,
    explication:"C'est la recherche binaire. À chaque itération, l'espace de recherche est divisé par 2 → au maximum log₂(n) itérations → O(log n)."
  },
  {
    id:22, type:"complexite",
    question:"Quelle est la complexité de cette fonction ?",
    code:`def compter(n):
    compte = 0
    i = n
    while i > 1:
        i = i // 2
        compte += 1
    return compte`,
    options:["O(n)","O(n²)","O(log n)","O(1)"],
    correct:2,
    explication:"La variable i est divisée par 2 à chaque itération : n → n/2 → n/4 → ... → 1. Le nombre d'itérations est log₂(n) → O(log n)."
  },
  {
    id:23, type:"complexite",
    question:"Quelle est la complexité globale de ce tri ?",
    code:`def tri(tab):
    if len(tab) <= 1:
        return tab
    m = len(tab) // 2
    g = tri(tab[:m])
    d = tri(tab[m:])
    return fusionner(g, d)  # fusionner est O(n)`,
    options:["O(n²)","O(n)","O(n log n)","O(log n)"],
    correct:2,
    explication:"C'est le tri fusion. T(n) = 2T(n/2) + O(n) → Théorème Maître cas 2 → O(n log n). Garanti dans tous les cas."
  },

  // ── BUG DANS CE CODE ? ────────────────────────────────────────────────────
  {
    id:24, type:"bug",
    question:"Ce code est censé faire une recherche binaire. Quel est le bug ?",
    code:`def recherche_bin(tab, cible):
    g, d = 0, len(tab)  # ← ici
    while g <= d:
        m = (g + d) // 2
        if tab[m] == cible: return m
        elif tab[m] < cible: g = m + 1
        else: d = m - 1
    return -1`,
    options:[
      "La condition while devrait être g < d",
      "d devrait être len(tab) - 1, pas len(tab)",
      "m devrait être calculé avec g + d // 2",
      "Il faut retourner True au lieu de m"
    ],
    correct:1,
    explication:"d = len(tab) pointe hors du tableau (indice invalide). Au premier accès tab[m], si m pointe sur la dernière case+1 → IndexError. Correct : d = len(tab) - 1."
  },
  {
    id:25, type:"bug",
    question:"Cette fonction récursive a un problème. Lequel ?",
    code:`def somme(n):
    return n + somme(n - 1)

print(somme(5))`,
    options:[
      "La fonction devrait retourner n * somme(n-1)",
      "Il manque un cas de base — récursion infinie",
      "Le paramètre devrait être une liste",
      "Il faut utiliser une boucle for à la place"
    ],
    correct:1,
    explication:"Il manque le cas de base ! Sans 'if n == 0: return 0', la fonction s'appelle infiniment → RecursionError. Correct : ajouter if n <= 0: return 0 en début de fonction."
  },
  {
    id:26, type:"bug",
    question:"Ce code est censé implémenter une pile. Quel est le bug ?",
    code:`class Pile:
    def __init__(self):
        self.data = []

    def push(self, val):
        self.data.append(val)

    def pop(self):
        return self.data.pop(0)  # ← ici`,
    options:[
      "append() ne fonctionne pas avec une pile",
      "pop(0) retire le premier élément (bas) au lieu du dernier (sommet)",
      "Il faut utiliser insert() au lieu de append()",
      "La classe devrait hériter de list"
    ],
    correct:1,
    explication:"Une pile est LIFO : on retire par le sommet (dernier entré). pop(0) retire le bas de la liste (FIFO = comportement d'une file). Correct : self.data.pop() sans argument."
  },
  {
    id:27, type:"bug",
    question:"Ce tri par insertion a un bug subtil. Lequel ?",
    code:`def tri_insertion(tab):
    for i in range(len(tab)):  # ← ici
        cle = tab[i]
        j = i - 1
        while j >= 0 and tab[j] > cle:
            tab[j + 1] = tab[j]
            j -= 1
        tab[j + 1] = cle
    return tab`,
    options:[
      "La boucle while devrait utiliser >= au lieu de >",
      "La boucle for devrait commencer à 1, pas à 0",
      "cle devrait être tab[i+1]",
      "Il faut échanger tab[i] et tab[j] directement"
    ],
    correct:1,
    explication:"Quand i=0, j=-1 et tab[j] = tab[-1] accède au dernier élément du tableau en Python — comportement inattendu. La boucle doit commencer à range(1, len(tab)) car le premier élément est déjà 'trié'."
  },
];

// ─── Composant Principal ──────────────────────────────────────────────────────

export default function AlgoKB() {
  const [fiches, setFiches] = useState(FICHES);
  const [landing, setLanding] = useState(true);
  const [chapitreActif, setChapitreActif] = useState("tris");
  const [ficheOuverte, setFicheOuverte] = useState(null);
  const [onglet, setOnglet] = useState("definition");
  const [recherche, setRecherche] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ titre:"", chapitre:"tris", niveau:"Débutant", resume:"", definition:"", code:"", schema:"", temps_moy:"", espace:"", stable:"" });
  const [modeQuiz, setModeQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizReponses, setQuizReponses] = useState({});
  const [quizTermine, setQuizTermine] = useState(false);
  const [quizSelectionne, setQuizSelectionne] = useState(null);

  const demarrerQuiz = () => {
    const melange = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizQuestions(melange);
    setQuizIndex(0);
    setQuizReponses({});
    setQuizTermine(false);
    setQuizSelectionne(null);
    setModeQuiz(true);
    setRecherche("");
    setFicheOuverte(null);
  };

  const choisirReponse = (idx) => {
    if (quizSelectionne !== null) return;
    setQuizSelectionne(idx);
    setQuizReponses(r => ({...r, [quizIndex]: idx}));
  };

  const questionSuivante = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(i => i+1);
      setQuizSelectionne(null);
    } else {
      setQuizTermine(true);
    }
  };

  const scoreQuiz = () => Object.entries(quizReponses).filter(([i, r]) => r === quizQuestions[i].correct).length;

  useEffect(() => {
    try { const s = localStorage.getItem("algokb-v2"); if (s) setFiches(JSON.parse(s)); } catch(_) {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("algokb-v2", JSON.stringify(fiches)); } catch(_) {}
  }, [fiches]);

  const toggleFav = (id) => setFiches(p => p.map(f => f.id===id ? {...f, favori:!f.favori} : f));
  const supprimer = (id) => { setFiches(p => p.filter(f => f.id!==id)); if (ficheOuverte?.id===id) setFicheOuverte(null); };
  const ouvrir = (f) => { setFicheOuverte(ficheOuverte?.id===f.id ? null : f); setOnglet("definition"); };

  const chapCourant = CHAPITRES.find(c => c.id === chapitreActif);
  const fichesDuChapitre = recherche
    ? fiches.filter(f => f.titre.toLowerCase().includes(recherche.toLowerCase()) || f.resume.toLowerCase().includes(recherche.toLowerCase()))
    : fiches.filter(f => f.chapitre === chapitreActif).sort((a,b) => a.ordre - b.ordre);

  const ajouterFiche = () => {
    if (!form.titre.trim()) return;
    const nf = { id: Date.now(), chapitre: form.chapitre, ordre: 99, favori: false,
      titre: form.titre, resume: form.resume, definition: form.definition,
      code: form.code, schema: form.schema,
      complexite: { temps_moy: form.temps_moy||"—", temps_meil:"—", temps_pire:"—", espace: form.espace||"—",
        stable: form.stable==="oui" ? true : form.stable==="non" ? false : null }};
    setFiches(p => [...p, nf]);
    setForm({ titre:"", chapitre:"tris", niveau:"Débutant", resume:"", definition:"", code:"", schema:"", temps_moy:"", espace:"", stable:"" });
    setShowForm(false);
  };

  const S = { // style tokens
    bg: "#f8fafc", sidebar: "#ffffff", card: "#ffffff",
    text: "#0f172a", muted: "#64748b", border: "#e2e8f0",
    accent: chapCourant?.color || "#1d4ed8",
  };

  return (
    <div style={{fontFamily:"'IBM Plex Sans',sans-serif",background:S.bg,color:S.text,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden",margin:0,padding:0,boxSizing:"border-box"}}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"/>

      {/* ══ LANDING PAGE ══ */}
      {landing && (
        <div style={{flex:1,overflowY:"auto",background:"#f8fafc"}}>
          {/* Hero */}
          <div style={{background:"#0f172a",padding:"60px 40px 80px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            {/* Grille déco */}
            <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(#1e293b 1px,transparent 1px),linear-gradient(90deg,#1e293b 1px,transparent 1px)",backgroundSize:"40px 40px",opacity:0.4}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"10px",background:"#1e293b",border:"1px solid #334155",borderRadius:"12px",padding:"8px 18px",marginBottom:"28px"}}>
                <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"16px",color:"#3b82f6",fontWeight:600}}>Σ</span>
                <span style={{fontSize:"13px",color:"#94a3b8",fontFamily:"'IBM Plex Mono',monospace"}}>AlgoKB</span>
              </div>
              <h1 style={{margin:"0 0 16px",fontSize:"42px",fontWeight:600,color:"#f1f5f9",lineHeight:1.2}}>
                Maîtrisez l'Algorithmique<br/>
                <span style={{color:"#3b82f6"}}>&amp; les Structures de données</span>
              </h1>
              <p style={{margin:"0 auto 36px",fontSize:"16px",color:"#94a3b8",lineHeight:1.7,maxWidth:"560px"}}>
                Une base de connaissances interactive conçue pour les étudiants et enseignants en informatique. Fiches détaillées, code Python, schémas et quiz intégré.
              </p>
              <div style={{display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap"}}>
                <button onClick={()=>setLanding(false)}
                  style={{background:"#3b82f6",border:"none",borderRadius:"10px",color:"#fff",padding:"13px 28px",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                  Accéder au cours →
                </button>
                <button onClick={()=>{ setLanding(false); setTimeout(()=>{ setModeQuiz(false); const m=[...QUESTIONS].sort(()=>Math.random()-0.5).slice(0,10); setQuizQuestions(m); setQuizIndex(0); setQuizReponses({}); setQuizTermine(false); setQuizSelectionne(null); setModeQuiz(true); },50); }}
                  style={{background:"transparent",border:"1px solid #334155",borderRadius:"10px",color:"#94a3b8",padding:"13px 28px",fontSize:"14px",fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>
                  🎯 Tester mes connaissances
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"1px",background:"#e2e8f0",borderBottom:"1px solid #e2e8f0"}}>
            {[
              { val:`${FICHES.length}`, label:"Fiches de cours" },
              { val:`${CHAPITRES.length}`, label:"Chapitres" },
              { val:`${QUESTIONS.length}`, label:"Questions de quiz" },
              { val:"Python", label:"Langage utilisé" },
            ].map(({val,label}) => (
              <div key={label} style={{background:"#fff",padding:"24px",textAlign:"center"}}>
                <div style={{fontSize:"28px",fontWeight:600,color:"#0f172a",fontFamily:"'IBM Plex Mono',monospace"}}>{val}</div>
                <div style={{fontSize:"11px",color:"#64748b",marginTop:"4px"}}>{label}</div>
              </div>
            ))}
          </div>

          {/* Chapitres */}
          <div style={{padding:"48px 40px"}}>
            <h2 style={{margin:"0 0 8px",fontSize:"22px",fontWeight:600,color:"#0f172a",textAlign:"center"}}>Contenu du cours</h2>
            <p style={{margin:"0 0 32px",fontSize:"13px",color:"#64748b",textAlign:"center"}}>6 chapitres progressifs, du plus simple au plus avancé</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"14px",maxWidth:"960px",margin:"0 auto"}}>
              {CHAPITRES.map(ch => (
                <div key={ch.id} onClick={()=>{ setChapitreActif(ch.id); setLanding(false); }}
                  style={{background:"#fff",border:`1px solid ${ch.border}`,borderLeft:`4px solid ${ch.color}`,borderRadius:"12px",padding:"18px 20px",cursor:"pointer",transition:"box-shadow 0.15s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:ch.color,fontWeight:600}}>{ch.num}</span>
                    <span style={{fontSize:"13px",fontWeight:600,color:"#0f172a"}}>{ch.label}</span>
                    <span style={{marginLeft:"auto",fontSize:"11px",color:ch.color,background:ch.light,padding:"2px 8px",borderRadius:"10px"}}>{FICHES.filter(f=>f.chapitre===ch.id).length} fiches</span>
                  </div>
                  <p style={{margin:0,fontSize:"11px",color:"#64748b",lineHeight:1.6}}>
                    {ch.id==="tris" && "Bulles, sélection, insertion, fusion, rapide, tas — complexités et implémentations Python."}
                    {ch.id==="structures" && "Listes, piles, files, arbres, tas, tables de hachage — bases de tout algorithme."}
                    {ch.id==="graphes" && "BFS, DFS, Dijkstra, Bellman-Ford — parcours et plus courts chemins."}
                    {ch.id==="recursivite" && "Factorielle, Fibonacci, Hanoï — mémoïsation et programmation dynamique."}
                    {ch.id==="recherche" && "Recherche linéaire et binaire — quand utiliser laquelle et pourquoi."}
                    {ch.id==="complexite" && "Big O, Théorème Maître, analyse amortie — mesurer l'efficacité."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz section */}
          <div style={{background:"#0f172a",padding:"48px 40px",textAlign:"center"}}>
            <h2 style={{margin:"0 0 10px",fontSize:"22px",fontWeight:600,color:"#f1f5f9"}}>🎯 Quiz interactif</h2>
            <p style={{margin:"0 auto 28px",fontSize:"13px",color:"#94a3b8",maxWidth:"480px",lineHeight:1.7}}>
              {QUESTIONS.length} questions mélangées à chaque session — théorie, analyse de code Python et détection de bugs. Feedback immédiat + score final.
            </p>
            <div style={{display:"flex",justifyContent:"center",gap:"20px",flexWrap:"wrap",marginBottom:"28px"}}>
              {[["🔍","Que retourne ce code ?"],["⏱","Quelle complexité ?"],["🐛","Trouvez le bug"],["📘","Questions de cours"]].map(([icon,label])=>(
                <div key={label} style={{background:"#1e293b",border:"1px solid #334155",borderRadius:"10px",padding:"12px 18px",display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{fontSize:"16px"}}>{icon}</span>
                  <span style={{fontSize:"12px",color:"#94a3b8"}}>{label}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>{ setLanding(false); const m=[...QUESTIONS].sort(()=>Math.random()-0.5).slice(0,10); setQuizQuestions(m); setQuizIndex(0); setQuizReponses({}); setQuizTermine(false); setQuizSelectionne(null); setModeQuiz(true); }}
              style={{background:"#3b82f6",border:"none",borderRadius:"10px",color:"#fff",padding:"12px 28px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
              Démarrer le quiz →
            </button>
          </div>

          {/* Footer */}
          <div style={{padding:"20px 40px",textAlign:"center",borderTop:"1px solid #e2e8f0"}}>
            <p style={{margin:0,fontSize:"11px",color:"#94a3b8"}}>AlgoKB — Application de Knowledge Management · Algorithmique &amp; Structures de données</p>
          </div>
        </div>
      )}

      {/* ══ APP PRINCIPALE ══ */}
      {!landing && <>

      {/* ── Bandeau supérieur ── */}
      <header style={{background:S.card,borderBottom:`1px solid ${S.border}`,padding:"14px 20px",display:"flex",alignItems:"center",gap:"16px",flexShrink:0}}>
        <div onClick={()=>setLanding(true)} style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}}>
          <div style={{width:"32px",height:"32px",background:"#0f172a",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:"#f1f5f9",fontSize:"14px",fontFamily:"'IBM Plex Mono',monospace",fontWeight:500}}>Σ</div>
          <div>
            <div style={{fontSize:"14px",fontWeight:600,color:S.text}}>AlgoKB</div>
            <div style={{fontSize:"10px",color:S.muted}}>Algorithmique & Structures de données</div>
          </div>
        </div>
        <div style={{flex:1,maxWidth:"360px",marginLeft:"20px",position:"relative"}}>
          <span style={{position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:"13px",pointerEvents:"none"}}>⌕</span>
          <input value={recherche} onChange={e=>setRecherche(e.target.value)} placeholder="Rechercher dans toutes les fiches…"
            style={{width:"100%",boxSizing:"border-box",background:S.bg,border:`1px solid ${S.border}`,borderRadius:"8px",padding:"7px 10px 7px 28px",fontSize:"12px",fontFamily:"inherit",color:S.text,outline:"none"}}/>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:"8px",alignItems:"center"}}>
          <span style={{fontSize:"11px",color:S.muted}}>{fiches.length} fiches · {fiches.filter(f=>f.favori).length} favoris</span>
          <button onClick={()=>setShowForm(v=>!v)}
            style={{background:showForm?"#0f172a":"transparent",border:`1px solid ${showForm?"#0f172a":S.border}`,borderRadius:"8px",color:showForm?"#f8fafc":S.muted,padding:"7px 12px",fontSize:"11px",cursor:"pointer",fontFamily:"inherit"}}>
            {showForm?"✕ Fermer":"+ Ajouter"}
          </button>
        </div>
      </header>

      <div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden"}}>
        {/* ── Sidebar chapitres ── */}
        <aside style={{width:"220px",minWidth:"220px",background:S.card,borderRight:`1px solid ${S.border}`,padding:"20px 12px",overflowY:"auto",flexShrink:0}}>
          <p style={{fontSize:"9px",fontWeight:600,color:"#94a3b8",letterSpacing:"1.2px",textTransform:"uppercase",margin:"0 8px 12px"}}>CHAPITRES</p>
          {CHAPITRES.map(ch => {
            const actif = chapitreActif === ch.id && !recherche;
            const nb = fiches.filter(f => f.chapitre === ch.id).length;
            return (
              <button key={ch.id} onClick={()=>{ setChapitreActif(ch.id); setRecherche(""); setFicheOuverte(null); setModeQuiz(false); }}
                style={{width:"100%",textAlign:"left",padding:"9px 10px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",marginBottom:"2px",
                  background: actif ? ch.light : "transparent",
                  color: actif ? ch.color : S.muted,
                  fontFamily:"inherit",fontSize:"12px",fontWeight: actif ? 600 : 400}}>
                <span style={{fontSize:"10px",fontFamily:"'IBM Plex Mono',monospace",color: actif ? ch.color : "#94a3b8",minWidth:"22px"}}>{ch.num}</span>
                <span style={{flex:1,lineHeight:1.3}}>{ch.label}</span>
                <span style={{fontSize:"9px",color: actif ? ch.color : "#cbd5e1",background: actif ? ch.color+"22" : S.bg,padding:"1px 6px",borderRadius:"10px"}}>{nb}</span>
              </button>
            );
          })}

          <div style={{marginTop:"20px",paddingTop:"16px",borderTop:`1px solid ${S.border}`}}>
            <p style={{fontSize:"9px",fontWeight:600,color:"#94a3b8",letterSpacing:"1.2px",textTransform:"uppercase",margin:"0 8px 10px"}}>MES FAVORIS</p>
            {fiches.filter(f=>f.favori).length === 0
              ? <p style={{fontSize:"11px",color:"#cbd5e1",padding:"0 8px"}}>Aucun favori</p>
              : fiches.filter(f=>f.favori).map(f => (
                  <button key={f.id} onClick={()=>{ setChapitreActif(f.chapitre); setRecherche(""); setFicheOuverte(f); setOnglet("definition"); setModeQuiz(false); }}
                    style={{width:"100%",textAlign:"left",padding:"6px 10px",borderRadius:"6px",border:"none",cursor:"pointer",background:"transparent",color:S.muted,fontFamily:"inherit",fontSize:"11px",marginBottom:"1px"}}>
                    ★ {f.titre}
                  </button>
                ))
            }
          </div>

          <div style={{marginTop:"20px",paddingTop:"16px",borderTop:`1px solid ${S.border}`}}>
            <button onClick={demarrerQuiz}
              style={{width:"100%",textAlign:"left",padding:"10px 10px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",
                background: modeQuiz ? "#fef9ee" : "transparent",
                color: modeQuiz ? "#b45309" : S.muted,
                fontFamily:"inherit",fontSize:"12px",fontWeight: modeQuiz ? 600 : 400}}>
              <span style={{fontSize:"14px"}}>🎯</span>
              <span style={{flex:1}}>Quiz — 10 questions</span>
              <span style={{fontSize:"9px",background: modeQuiz ? "#b4530922" : S.bg,color: modeQuiz ? "#b45309" : "#cbd5e1",padding:"1px 6px",borderRadius:"10px"}}>{QUESTIONS.length}Q</span>
            </button>
          </div>
        </aside>

        {/* ── Contenu principal ── */}
        <main style={{flex:1,minWidth:0,padding:"24px",overflowY:"auto"}}>

          {/* ── Vue Quiz ── */}
          {modeQuiz && !quizTermine && quizQuestions.length > 0 && (() => {
            const q = quizQuestions[quizIndex];
            const correct = q.correct;
            return (
              <div>
                {/* Barre de progression */}
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"24px"}}>
                  <span style={{fontSize:"11px",color:S.muted,whiteSpace:"nowrap"}}>Question {quizIndex+1} / {quizQuestions.length}</span>
                  <div style={{flex:1,height:"6px",background:S.border,borderRadius:"10px",overflow:"hidden"}}>
                    <div style={{height:"100%",background:"#b45309",borderRadius:"10px",width:`${((quizIndex+1)/quizQuestions.length)*100}%`,transition:"width 0.3s"}}/>
                  </div>
                  <span style={{fontSize:"11px",color:"#b45309",fontWeight:600}}>{Math.round(((quizIndex+1)/quizQuestions.length)*100)}%</span>
                </div>

                {/* Question */}
                <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:"14px",padding:"24px",marginBottom:"16px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}>
                    <span style={{fontSize:"10px",color:S.muted,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600}}>Question {quizIndex+1}</span>
                    { q.type==="retour" && <span style={{fontSize:"9px",padding:"2px 8px",borderRadius:"10px",background:"#eff6ff",color:"#1d4ed8",fontWeight:600}}>🔍 Que retourne ce code ?</span> }
                    { q.type==="complexite" && <span style={{fontSize:"9px",padding:"2px 8px",borderRadius:"10px",background:"#fef9ee",color:"#b45309",fontWeight:600}}>⏱ Quelle est la complexité ?</span> }
                    { q.type==="bug" && <span style={{fontSize:"9px",padding:"2px 8px",borderRadius:"10px",background:"#fff1f2",color:"#be123c",fontWeight:600}}>🐛 Trouvez le bug</span> }
                  </div>
                  <h3 style={{margin:"0 0 0",fontSize:"15px",fontWeight:600,color:S.text,lineHeight:1.5}}>{q.question}</h3>
                </div>

                {/* Bloc de code si présent */}
                {q.code && (
                  <div style={{marginBottom:"16px",borderRadius:"12px",overflow:"hidden",border:`1px solid #e2e8f0`}}>
                    <div style={{background:"#1e293b",padding:"8px 14px",display:"flex",alignItems:"center",gap:"8px"}}>
                      <div style={{display:"flex",gap:"5px"}}>
                        <div style={{width:"10px",height:"10px",borderRadius:"50%",background:"#ef4444"}}/>
                        <div style={{width:"10px",height:"10px",borderRadius:"50%",background:"#f59e0b"}}/>
                        <div style={{width:"10px",height:"10px",borderRadius:"50%",background:"#22c55e"}}/>
                      </div>
                      <span style={{fontSize:"10px",color:"#64748b",marginLeft:"4px",fontFamily:"'IBM Plex Mono',monospace"}}>python</span>
                    </div>
                    <pre style={{margin:0,background:"#0f172a",padding:"18px 20px",fontSize:"12.5px",color:"#93c5fd",overflowX:"auto",whiteSpace:"pre",fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.75}}>{q.code}</pre>
                  </div>
                )}

                {/* Options */}
                <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"20px"}}>
                  {q.options.map((opt, idx) => {
                    let bg = S.card, border = S.border, color = S.text;
                    if (quizSelectionne !== null) {
                      if (idx === correct) { bg="#f0fdf4"; border="#86efac"; color="#15803d"; }
                      else if (idx === quizSelectionne && idx !== correct) { bg="#fff1f2"; border="#fda4af"; color="#be123c"; }
                      else { color=S.muted; }
                    }
                    return (
                      <button key={idx} onClick={()=>choisirReponse(idx)}
                        style={{background:bg,border:`1px solid ${border}`,borderRadius:"10px",padding:"14px 16px",cursor:quizSelectionne!==null?"default":"pointer",
                          display:"flex",alignItems:"center",gap:"12px",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s"}}>
                        <span style={{width:"26px",height:"26px",borderRadius:"50%",border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:"11px",fontWeight:600,color,background:"transparent",flexShrink:0}}>
                          {["A","B","C","D"][idx]}
                        </span>
                        <span style={{fontSize:"13px",color,fontWeight: idx===correct && quizSelectionne!==null ? 600 : 400}}>{opt}</span>
                        {quizSelectionne !== null && idx === correct && <span style={{marginLeft:"auto",color:"#15803d",fontSize:"16px"}}>✓</span>}
                        {quizSelectionne !== null && idx === quizSelectionne && idx !== correct && <span style={{marginLeft:"auto",color:"#be123c",fontSize:"16px"}}>✗</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Explication + bouton suivant */}
                {quizSelectionne !== null && (
                  <div>
                    <div style={{background:"#fefce8",border:"1px solid #fde68a",borderRadius:"10px",padding:"14px 16px",marginBottom:"14px"}}>
                      <p style={{margin:"0 0 4px",fontSize:"10px",fontWeight:600,color:"#92400e",textTransform:"uppercase",letterSpacing:"0.8px"}}>💡 Explication</p>
                      <p style={{margin:0,fontSize:"12px",color:"#78350f",lineHeight:1.7}}>{q.explication}</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                      <button onClick={questionSuivante}
                        style={{background:"#0f172a",border:"none",borderRadius:"8px",color:"#f8fafc",padding:"10px 22px",fontSize:"12px",cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>
                        {quizIndex < quizQuestions.length-1 ? "Question suivante →" : "Voir le score →"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── Résultat Quiz ── */}
          {modeQuiz && quizTermine && (() => {
            const score = scoreQuiz();
            const pct = Math.round((score/quizQuestions.length)*100);
            const mention = pct>=80?"Excellent !":pct>=60?"Bien !":pct>=40?"À revoir":"Insuffisant";
            const couleur = pct>=80?"#15803d":pct>=60?"#1d4ed8":pct>=40?"#b45309":"#be123c";
            const bgMention = pct>=80?"#f0fdf4":pct>=60?"#eff6ff":pct>=40?"#fef9ee":"#fff1f2";
            return (
              <div>
                {/* Score principal */}
                <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:"16px",padding:"32px",textAlign:"center",marginBottom:"24px"}}>
                  <div style={{fontSize:"56px",fontWeight:700,color:couleur,fontFamily:"'IBM Plex Mono',monospace",marginBottom:"8px"}}>
                    {score}<span style={{fontSize:"28px",color:S.muted}}>/{quizQuestions.length}</span>
                  </div>
                  <div style={{display:"inline-block",background:bgMention,color:couleur,border:`1px solid ${couleur}44`,borderRadius:"20px",padding:"4px 16px",fontSize:"13px",fontWeight:600,marginBottom:"12px"}}>
                    {mention}
                  </div>
                  <p style={{margin:0,fontSize:"13px",color:S.muted}}>{pct}% de bonnes réponses</p>
                </div>

                {/* Détail par question */}
                <h3 style={{fontSize:"13px",fontWeight:600,margin:"0 0 14px",color:S.text}}>Détail des réponses</h3>
                <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"}}>
                  {quizQuestions.map((q,i) => {
                    const rep = quizReponses[i];
                    const ok = rep === q.correct;
                    return (
                      <div key={i} style={{background:S.card,border:`1px solid ${ok?"#86efac":"#fda4af"}`,borderLeft:`3px solid ${ok?"#15803d":"#be123c"}`,borderRadius:"8px",padding:"12px 14px"}}>
                        <div style={{display:"flex",alignItems:"flex-start",gap:"10px"}}>
                          <span style={{fontSize:"14px",flexShrink:0}}>{ok?"✓":"✗"}</span>
                          <div style={{flex:1}}>
                            <p style={{margin:"0 0 4px",fontSize:"12px",fontWeight:500,color:S.text}}>{q.question}</p>
                            <p style={{margin:0,fontSize:"11px",color:ok?"#15803d":"#be123c"}}>
                              Votre réponse : <strong>{q.options[rep]}</strong>
                              {!ok && <span style={{color:S.muted}}> → Correct : <strong style={{color:"#15803d"}}>{q.options[q.correct]}</strong></span>}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{display:"flex",justifyContent:"center",gap:"12px"}}>
                  <button onClick={demarrerQuiz}
                    style={{background:"#0f172a",border:"none",borderRadius:"8px",color:"#f8fafc",padding:"10px 22px",fontSize:"12px",cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>
                    🔄 Recommencer
                  </button>
                  <button onClick={()=>setModeQuiz(false)}
                    style={{background:"transparent",border:`1px solid ${S.border}`,borderRadius:"8px",color:S.muted,padding:"10px 22px",fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>
                    ← Retour aux fiches
                  </button>
                </div>
              </div>
            );
          })()}

          {/* ── Contenu normal (masqué pendant le quiz) ── */}
          {!modeQuiz && <>

          {/* Formulaire ajout */}
          {showForm && (
            <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:"12px",padding:"20px",marginBottom:"24px"}}>
              <h3 style={{margin:"0 0 16px",fontSize:"13px",fontWeight:600}}>Nouvelle fiche</h3>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"10px",marginBottom:"10px"}}>
                <input value={form.titre} onChange={e=>setForm(f=>({...f,titre:e.target.value}))} placeholder="Titre *" style={IS}/>
                <select value={form.chapitre} onChange={e=>setForm(f=>({...f,chapitre:e.target.value}))} style={IS}>
                  {CHAPITRES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <textarea value={form.resume} onChange={e=>setForm(f=>({...f,resume:e.target.value}))} placeholder="Résumé (une ligne)"
                style={{...IS,width:"100%",boxSizing:"border-box",resize:"vertical",minHeight:"48px",marginBottom:"10px"}}/>
              <textarea value={form.definition} onChange={e=>setForm(f=>({...f,definition:e.target.value}))} placeholder="Définition / théorie détaillée"
                style={{...IS,width:"100%",boxSizing:"border-box",resize:"vertical",minHeight:"80px",marginBottom:"10px"}}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
                <textarea value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} placeholder="Code Python"
                  style={{...IS,resize:"vertical",minHeight:"80px",fontFamily:"'IBM Plex Mono',monospace"}}/>
                <textarea value={form.schema} onChange={e=>setForm(f=>({...f,schema:e.target.value}))} placeholder="Schéma ASCII"
                  style={{...IS,resize:"vertical",minHeight:"80px",fontFamily:"'IBM Plex Mono',monospace"}}/>
              </div>
              <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                <input value={form.temps_moy} onChange={e=>setForm(f=>({...f,temps_moy:e.target.value}))} placeholder="Temps ex: O(n log n)" style={{...IS,flex:1}}/>
                <input value={form.espace} onChange={e=>setForm(f=>({...f,espace:e.target.value}))} placeholder="Espace ex: O(n)" style={{...IS,flex:1}}/>
                <select value={form.stable} onChange={e=>setForm(f=>({...f,stable:e.target.value}))} style={{...IS,flex:1}}>
                  <option value="">Stable ?</option><option value="oui">Oui</option><option value="non">Non</option>
                </select>
                <button onClick={ajouterFiche}
                  style={{background:"#0f172a",border:"none",borderRadius:"8px",color:"#f8fafc",padding:"8px 18px",fontSize:"12px",cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                  Ajouter ✓
                </button>
              </div>
            </div>
          )}

          {/* En-tête du chapitre */}
          {!recherche && chapCourant && (
            <div style={{marginBottom:"20px",paddingBottom:"16px",borderBottom:`2px solid ${chapCourant.border}`}}>
              <div style={{display:"flex",alignItems:"baseline",gap:"12px"}}>
                <span style={{fontSize:"11px",fontFamily:"'IBM Plex Mono',monospace",color:chapCourant.color,fontWeight:500}}>{chapCourant.num}</span>
                <h2 style={{margin:0,fontSize:"20px",fontWeight:600,color:S.text}}>{chapCourant.label}</h2>
                <span style={{fontSize:"11px",color:S.muted}}>{fichesDuChapitre.length} fiche{fichesDuChapitre.length>1?"s":""}</span>
              </div>
            </div>
          )}

          {recherche && (
            <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:`1px solid ${S.border}`}}>
              <h2 style={{margin:0,fontSize:"15px",fontWeight:500,color:S.muted}}>
                Résultats pour <span style={{color:S.text}}>"{recherche}"</span> — {fichesDuChapitre.length} fiche{fichesDuChapitre.length>1?"s":""}
              </h2>
            </div>
          )}

          {/* Liste des fiches */}
          <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
            {fichesDuChapitre.map((fiche, idx) => {
              const ch = CHAPITRES.find(c=>c.id===fiche.chapitre);
              const ouvert = ficheOuverte?.id === fiche.id;
              return (
                <div key={fiche.id}>
                  {/* Ligne de la fiche */}
                  <div onClick={()=>ouvrir(fiche)}
                    style={{background: ouvert ? (ch?.light||"#f0f9ff") : S.card,
                      border:`1px solid ${ouvert ? (ch?.border||S.border) : S.border}`,
                      borderLeft: ouvert ? `3px solid ${ch?.color||"#1d4ed8"}` : `3px solid transparent`,
                      borderRadius: ouvert ? "12px 12px 0 0" : idx===0 ? "12px 12px 0 0" : idx===fichesDuChapitre.length-1 ? "0 0 12px 12px" : "0",
                      padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",
                      marginTop: idx===0 ? 0 : "-1px",transition:"background 0.15s"}}>

                    <span style={{fontSize:"11px",fontFamily:"'IBM Plex Mono',monospace",color:"#94a3b8",minWidth:"20px"}}>{String(idx+1).padStart(2,"0")}</span>

                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"3px"}}>
                        <span style={{fontSize:"13px",fontWeight:600,color:ouvert?ch?.color:S.text}}>{fiche.titre}</span>
                        {fiche.favori && <span style={{color:"#f59e0b",fontSize:"12px"}}>★</span>}
                      </div>
                      <p style={{margin:0,fontSize:"11px",color:S.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{fiche.resume}</p>
                    </div>

                    <div style={{display:"flex",gap:"6px",alignItems:"center",flexShrink:0}}>
                      <span style={{fontSize:"10px",fontFamily:"'IBM Plex Mono',monospace",background:"#f1f5f9",color:"#475569",padding:"2px 8px",borderRadius:"6px"}}>{fiche.complexite.temps_moy}</span>
                      {fiche.complexite.stable !== null && (
                        <span style={{fontSize:"9px",padding:"2px 7px",borderRadius:"6px",background:fiche.complexite.stable?"#f0fdf4":"#fff1f2",color:fiche.complexite.stable?"#15803d":"#be123c"}}>
                          {fiche.complexite.stable?"Stable":"Instable"}
                        </span>
                      )}
                      <span style={{fontSize:"11px",color:"#94a3b8",marginLeft:"4px"}}>{ouvert?"▲":"▼"}</span>
                    </div>
                  </div>

                  {/* Panneau de détail */}
                  {ouvert && (
                    <div style={{background:S.card,border:`1px solid ${ch?.border||S.border}`,borderTop:"none",borderLeft:`3px solid ${ch?.color||"#1d4ed8"}`,borderRadius:"0 0 12px 12px",marginBottom:"12px"}}>

                      {/* Onglets */}
                      <div style={{display:"flex",borderBottom:`1px solid ${S.border}`,padding:"0 16px",gap:"2px"}}>
                        {[["definition","📘 Théorie"],["code","🐍 Python"],["schema","📊 Schéma"],["complexite","⏱ Complexité"]].map(([k,label]) => (
                          <button key={k} onClick={e=>{e.stopPropagation();setOnglet(k);}}
                            style={{padding:"10px 14px",border:"none",borderBottom: onglet===k ? `2px solid ${ch?.color}` : "2px solid transparent",background:"transparent",cursor:"pointer",fontFamily:"inherit",fontSize:"11px",fontWeight: onglet===k ? 600 : 400,color: onglet===k ? ch?.color : S.muted,marginBottom:"-1px"}}>
                            {label}
                          </button>
                        ))}
                        <div style={{flex:1}}/>
                        <button onClick={e=>{e.stopPropagation();toggleFav(fiche.id);}} style={{background:"none",border:"none",cursor:"pointer",color:fiche.favori?"#f59e0b":"#cbd5e1",fontSize:"15px",padding:"10px 8px",alignSelf:"center"}}>
                          {fiche.favori?"★":"☆"}
                        </button>
                        <button onClick={e=>{e.stopPropagation();if(window.confirm("Supprimer ?")) supprimer(fiche.id);}} style={{background:"none",border:"none",cursor:"pointer",color:"#cbd5e1",fontSize:"13px",padding:"10px 6px",alignSelf:"center"}}>
                          ✕
                        </button>
                      </div>

                      <div style={{padding:"20px"}} onClick={e=>e.stopPropagation()}>
                        {onglet==="definition" && (
                          <p style={{margin:0,fontSize:"13px",color:S.text,lineHeight:1.85,whiteSpace:"pre-line"}}>{fiche.definition}</p>
                        )}
                        {onglet==="code" && (
                          fiche.code
                            ? <pre style={{margin:0,background:"#0f172a",borderRadius:"10px",padding:"18px",fontSize:"12px",color:"#93c5fd",overflowX:"auto",whiteSpace:"pre",fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.7}}>{fiche.code}</pre>
                            : <p style={{color:S.muted,fontSize:"12px"}}>Aucun code disponible.</p>
                        )}
                        {onglet==="schema" && (
                          fiche.schema
                            ? <pre style={{margin:0,background:"#f8fafc",border:`1px solid ${S.border}`,borderRadius:"10px",padding:"18px",fontSize:"12px",color:"#334155",overflowX:"auto",whiteSpace:"pre",fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.8}}>{fiche.schema}</pre>
                            : <p style={{color:S.muted,fontSize:"12px"}}>Aucun schéma disponible.</p>
                        )}
                        {onglet==="complexite" && (
                          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"12px"}}>
                            {[
                              ["Temps moyen", fiche.complexite.temps_moy],
                              ["Meilleur cas", fiche.complexite.temps_meil],
                              ["Pire cas", fiche.complexite.temps_pire],
                              ["Espace", fiche.complexite.espace],
                              ["Stable", fiche.complexite.stable===null?"N/A":fiche.complexite.stable?"Oui ✓":"Non ✗"],
                            ].map(([lbl, val]) => (
                              <div key={lbl} style={{background:S.bg,border:`1px solid ${S.border}`,borderRadius:"10px",padding:"14px"}}>
                                <p style={{margin:"0 0 6px",fontSize:"9px",color:S.muted,textTransform:"uppercase",letterSpacing:"0.8px",fontWeight:600}}>{lbl}</p>
                                <p style={{margin:0,fontSize:"18px",fontWeight:600,color:S.text,fontFamily:"'IBM Plex Mono',monospace"}}>{val}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {fichesDuChapitre.length === 0 && (
            <div style={{textAlign:"center",color:"#94a3b8",fontSize:"13px",padding:"80px 0"}}>
              Aucune fiche pour cette sélection.
            </div>
          )}
          </>}
        </main>
      </div>
      </>}
    </div>
  );
}

const IS = {
  background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:"8px",
  color:"#0f172a", padding:"8px 10px", fontSize:"12px",
  fontFamily:"'IBM Plex Sans',sans-serif", width:"100%", boxSizing:"border-box",
  outline:"none",
};
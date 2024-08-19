import json, sqlite3


def ball(rank, leniency, fields=False, sort_by=0):
    #connect to the database
    conn = sqlite3.connect('')
    cursor = conn.cursor()
    # percentages
    f = lambda x: (100*x)/1410
    
    rank = f(rank)
    # flattening
    cursor.execute("SELECT * FROM Data_MP")
    ball = cursor.fetchall()   
    
    # filtering by admission likelihood 
    ball = [i for i in ball if f(i[5])>= rank-leniency]     
    
    # filtering by FIELD  
    if fields:
        with open("data_sets/categories.json", 'r', encoding='utf-8') as file:
            categ = json.load(file) 
            filter=[]
            filter += [x for f in fields for x in categ[f]]
        ball = [i for i in ball if i[4] in filter]
    
    # writing to csv
    
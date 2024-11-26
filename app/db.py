import sqlite3

#control db calling based on MP, PC or BG

def ball(rank, section):
    #connect to the database
    conn = sqlite3.connect('instance/database.db')
    cursor = conn.cursor()
    
    # percentages
    f = lambda x: (100*x)/1410
    rank = f(rank) 

    # flattening
    cursor.execute("SELECT * FROM data WHERE section = ?", (section,))
    ball = cursor.fetchall()
    
    # add diff
    y = lambda i: float( "{:.2f}".format(f(i[5])-rank) )
    ball = [i+(y(i),) for i in ball if i[5]<9000]
    # (ecole, filiere, gov, rang, diff)

    return ball
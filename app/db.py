import json, sqlite3


def ball(rank):
    #connect to the database
    conn = sqlite3.connect('instance\database.db')
    cursor = conn.cursor()
    
    # percentages
    f = lambda x: (100*x)/1410
    rank = f(rank) 

    # flattening
    cursor.execute("SELECT * FROM data")
    ball = cursor.fetchall()
    
    # add diff
    y = lambda i: float( "{:.2f}".format(f(i[5])-rank) )
    ball = [i+(y(i),) for i in ball]

    return ball
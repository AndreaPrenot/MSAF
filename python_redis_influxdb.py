#IMPORT:

from datetime import datetime
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import redis
import json
import time




#FUNZIONI:

#Funzione di connessione a Redis
def conninflux():
    #Connesione ad Influx try catch
    try:
        # Connessione ad Influx
        client = InfluxDBClient(url="http://localhost:8086", token=token)
        return client
    except ValueError:
        print("Connessione ad Influx scaduta")
        #5 secondi di attesa
        time.sleep( 5 )
        conninflux()

#Funzione di connessione a Redis
def connredis():
    #Connesione a Redis try catch
    try:
        # Collegamento a Redis
        r = redis.Redis(host='localhost', port=6379, db=0)
        # Controllo se la lista ha elementi all'interno
        while (r.llen('Silos')==0):
            print("Nessun elemento è presente in coda")
            #5 secondi di attesa nel caso non ci fossero elementi in coda
            time.sleep( 5 )
        # RPOP dalla lista
        dato = r.lpop('Silos')
        return dato
    except ValueError:
        print("Connessione ad Influx scaduta")
        #5 secondi di attesa
        time.sleep( 5 )
        connredis()







#CODICE:
        
# Dati di collegamento per Influxdb
token = "VSs4zsQwbDr_Wb0uAEnROay7eiSyBiy7BFhJapknChSVwehdl3WbIX84W7EoGS0fYMpKZBrbTSfBzfRqDoL2zA=="
org = "MSAF"
bucket = "Silos"



while True:
    dato = connredis()
    #Trasformo dato in stringa per non aver problemi nella conversione
    dato = str(dato)
    #Tolgo la prima b dalla stringa ed i 2 singoli apici (ad inizio e fine stringa)
    dato = dato.replace("b", "", 1)
    dato = dato.replace("'", "")
    
    
    client = conninflux()
   

    #Stringa in Json
    converted = json.loads(str(dato))

    #Comodità per prelevare i dati da Json
    full = converted['values']
    #Salviamo il livello dei Silos
    silos1=0;
    silos2=0;
    silos3=0;
    silos4=0;
    silos5=0;
    silos6=0;
    silos7=0;
    #Salviamo i valori dei livelli dei Silos
    for i in range(0, 49 , 7):
        if (i==0):
            for k in range(0, 8 , 1):
                prova = full[i+k]
                if(prova["v"] == True):
                    silos1 = silos1 + 1
        elif(i==7):    
            for k in range(0, 8 , 1):
                prova = full[i+k]
                if(prova["v"] == True):
                    silos2 = silos2 + 1
        elif(i==14):
            for k in range(0, 8 , 1):
                prova = full[i+k]
                if(prova["v"] == True):
                    silos3 = silos3 + 1
        elif(i==21):
            for k in range(0, 8 , 1):
                prova = full[i+k]
                if(prova["v"] == True):
                    silos4 = silos4 + 1
        elif(i==28):
            for k in range(0, 8 , 1):
                prova = full[i+k]
                if(prova["v"] == True):
                    silos5 = silos5 + 1
        elif(i==35):
            for k in range(0, 8 , 1):
                prova = full[i+k]
                if(prova["v"] == True):
                    silos6 = silos6 + 1
        elif(i==42):
            for k in range(0, 8 , 1):
                prova = full[i+k]
                if(prova["v"] == True):
                    silos7 = silos7 + 1

    #Salviamo le temperature
    prova = full[49]
    temperaturas1 = prova["v"]
    temperaturas1 = temperaturas1/1000

    prova = full[50]
    temperaturas2 = prova["v"]
    temperaturas2 = temperaturas2/1000

    prova = full[51]
    temperaturas3 = prova["v"]
    temperaturas3 = temperaturas3/1000
    
    prova = full[52]
    temperaturas4 = prova["v"]
    temperaturas4 = temperaturas4/1000
    

    prova = full[53]
    temperaturas5 = prova["v"]
    temperaturas5 = temperaturas5/1000

    prova = full[54]
    temperaturas6 = prova["v"]
    temperaturas6 = temperaturas6/1000

    prova = full[55]
    temperaturas7 = prova["v"]
    temperaturas7 = temperaturas7/1000
    

    #Creazione del point da mandare ad Influx
    point = Point("Silos").tag("host", "host1")
    point.field("livellos1", silos1)
    point.field("livellos2", silos2)
    point.field("livellos3", silos3)
    point.field("livellos4", silos4)
    point.field("livellos5", silos5)
    point.field("livellos6", silos6)
    point.field("livellos7", silos7)
    point.field("temperaturas1", temperaturas1)
    point.field("temperaturas2", temperaturas2)
    point.field("temperaturas3", temperaturas3)
    point.field("temperaturas4", temperaturas4)
    point.field("temperaturas5", temperaturas5)
    point.field("temperaturas6", temperaturas6)
    point.field("temperaturas7", temperaturas7)
    
    
    write_api = client.write_api()
    write_api.write(bucket, org, point)
    
    print("Tutto è funzionato correttamente, 5 secondi per il prossimo oggetto")

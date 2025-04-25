# unagi-tw

For TW Internal hackathon

### Setup:

Docker command for PG Vector:

```
docker run --name postgres-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=db \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d ankane/pgvector
```

### Add data to knowledge base:

Add your files to the "/backend/knowledge-base/data" folder and run the following command

```
python3 ./backend/knowledge-base/knowledge-base.py
```

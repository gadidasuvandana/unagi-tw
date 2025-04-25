# unagi-tw

For TW Internal hackathon

Team name: Unagi, (Vandana and Lokeswaran)


Problem statement: Onboarding new joiners into projects is a tedious task.
It takes a lot of time(~2 weeks) to get them up to speed with the project.
The new joiners have to go through a lot of documentation and code to understand the project.
This is a time-consuming process and can be improved by creating a knowledge base of the project material.
We want to provide a solution that can answer questions about the project material and help new joiners get up to speed quickly.
We want to simplify the onboarding process of across roles, BA, dev and QA.
This is cater to specific requirements of roles and tailor the material according to that.
This also serves as a unified tool for knowledge instead of scattered documents across platforms like Confluence,git pages, etc.


Solution:
This project aims to simplify the onboarding process of folks into projects.
It creates a knowledge base of project material and can answer questions about it.

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

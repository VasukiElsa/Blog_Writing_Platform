FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

ENTRYPOINT ["python3"]

CMD ["manage.py", "runserver", "0.0.0.0:8000"]


ORIGIN ?= http://localhost:3000
DATA ?= { "name": "sumire", "role": "student-2023" }
seed_singledata:
	curl -X POST ${ORIGIN}/users \
		--header 'content-type: application/json' --header 'user-agent: make' \
		--data '${DATA}'

seed_testdata:
	make seed_singledata DATA='{ "name": "sumire", "role": "student-2023" }'
	make seed_singledata DATA='{ "name": "hak", "role": "teacher" }'
	make seed_singledata DATA='{ "name": "katsumata", "role": "teacher" }'
	make seed_singledata DATA='{ "name": "tam", "role": "student-2023" }'
	make seed_singledata DATA='{ "name": "taku_ting", "role": "student-2023" }'
	make seed_singledata DATA='{ "name": "fuhii", "role": "student-2024" }'
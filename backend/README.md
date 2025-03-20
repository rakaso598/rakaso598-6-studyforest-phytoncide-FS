# `공부의 숲` 팀프로젝트 백엔드 구성 방법 및 가이드

---

## 차례로 실행해서 백엔드 서버를 초기화하고 테스트해보세요!

- 처음 깃 클론 이후 다음 코드를 차례대로 콘솔에 입력해보세요.

1. cd study-forest/
2. cd backend/
3. npm install
4. npm run dev
5. 서버가 실행된 채로 `새로운 콘솔을 하나 더 실행`합니다.
6. `새로운 콘솔`에서 `curl http://localhost:5090/health-check` 를 입력해 요청을 보내봅니다. (curl은 콘솔에서 간단한 GET request를 보내는 명령어입니다)
7. `새로운 콘솔`에 응답으로 `헬스체크 성공!`이 뜨고 `서버 콘솔`에서 `OK`가 보인다면 초기화 완료입니다.

---

### `client.prisma.js` 는 어떤 파일인가요?

- src/db/prisma/client.prisma.js 는 `프리즈마 ORM 기능을 사용하기 위해` 작성된 파일입니다.
- `const prisma = require("../db/prisma/client.prisma")` 로 이 js파일을 임포트하면 `prisma`라는 객체명으로 ORM을 사용할 수 있습니다.

---

### 프리즈마 설치 어떻게 했나요?

- 프리즈마 첫 설치시 이 공식문서를 참고했습니다 : [프리즈마 퀵스타트 PostgreSQL 버전](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

---

## 폴더 구조는 수업시간에 반복적으로 사용했던 구조를 최대한 비슷하게 사용했습니다.

- src/db/prisma/schema.prisma : `프리즈마 ORM`에서 사용하는 `스키마 모델`입니다. 여기에서 기본적인 프리즈마 DB 모델을 설계할 수 있습니다.
- src/middlewares/errorHandler.module.js : `서버 내부 에러`가 발생했을 때 기본적인 500 서버 에러를 발생시킵니다.
- src/modules/index.module.js : 라우팅을 위한 기본 루트 경로가 됩니다. 이곳에 `user.module.js`나 `study.module.js` 등을 불러와 사용하면 됩니다.
- src/modules/healthCheck.module.js : 처음 깃클론시 헬스체크를 위한 모듈입니다. `npm install` 후 `npm run dev`로 서버를 실행하고, `curl http://localhost:5090/health-check` 를 다른 콘솔을 켜서 입력해보고 `헬스체크 성공!`이 뜨면 프로젝트 초기화 된 것입니다.

---

## 초기화 할때 설치했던 것 (수업과 동일) :

- npm install express @types/express nodemon cors

nodemon : 코드가 변경되면 자동으로 서버를 재시작합니다.
cors : 브라우저에서 발생하는 `CORS`이슈를 방지하기 위해 인스톨했습니다.

---

## npm run dev를 하면 nodemon을 통해 app.js가 실행되는 이유? (수업과 동일) :

"scripts": {
"dev": "nodemon ./src/app.js"
},

- `package.json` 안에 "scripts" 내부에 "dev": "nodemon ./src/app.js" 이라고 작성했습니다.
- npm run dev 를 실행하면 src 내부에 있는 app.js를 nodemon으로 실행하겠다는 의미입니다.

---

## 프리즈마 파일 경로를 변경시켰는데 어떻게 위치를 알려줄까요? :

"prisma": {
"schema": "./src/db/prisma/schema.prisma"
}

- `package.json` 안에 스키마의 위치를 작성해놓고 `npx prisma migrate` 를 실행하면 경로 오류를 방지할 수 있어요.

---

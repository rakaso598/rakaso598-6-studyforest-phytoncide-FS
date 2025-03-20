# `공부의 숲` 팀프로젝트 백엔드 구성 방법 및 가이드

---

1. 깃 클론 이후 npm install 실행해보세요.
2. npm run dev 로 서버가 실행되는지 확인해보세요.
3. 서버가 실행된 채로 다른 콘솔을 켜서 `curl http://localhost:5090/health-check` 를 입력해 요청을 보내보세요. 콘솔에서 간단한 GET request를 보내는 코드입니다.
4. 응답으로 `헬스체크 성공!`이 뜨면 초기화 완료입니다.

---

- src/db/prisma/client.prisma.js 는 프리즈마 ORM을 사용하기 위해 작성된 파일입니다.
- `const prisma = require("../db/prisma/client.prisma")` 로 이 js파일을 임포트하면 `prisma`라는 객체명으로 ORM을 사용할 수 있습니다.

---

- 프리즈마 ORM에 대해서는 설치만 되어있고 실행은 아직 안됩니다. `https://render.com`에서 원격 DB 주소를 뽑아낸 이후 프리즈마 스키마를 작성하고, 마이그레이션 후 실행결과를 확인해보면 됩니다.

- 프리즈마 설치할 때 이 문서를 따라했습니다 (프리즈마 퀵스타트-PostgreSQL) : `https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql`

---

## 폴더 구조는 수업시간에 반복적으로 사용했던 구조를 최대한 비슷하게 사용했습니다.

- src/db/prisma/schema.prisma : `프리즈마 ORM`을 사용하기 위한 파일입니다. js 파일에서 임포트하여 불러와 사용할 수 있습니다.
- src/middlewares/errorHandler.module.js : `서버 내부 에러`가 발생했을 때 기본적인 500 서버 에러를 발생시킵니다.
- src/modules/index.module.js : 라우팅을 위한 기본 루트 경로가 됩니다. 이곳에 `user.module.js`나 `study.module.js` 등을 불러와 사용하면 됩니다.
- src/modules/healthCheck.module.js : 처음 깃클론시 헬스체크를 위한 모듈입니다. `npm install` 후 `npm run dev`로 서버를 실행하고, `curl http://localhost:5090/health-check` 를 다른 콘솔을 켜서 입력해보고 `헬스체크 성공!`이 뜨면 프로젝트 초기화 된 것입니다.

---

## 초기화 할때 설치했던 것(수업과 동일) :

- npm install express @types/express nodemon cors

nodemon : 코드가 변경되면 자동으로 서버를 재시작합니다.
cors : 브라우저에서 발생하는 `CORS`이슈를 방지하기 위해 인스톨했습니다.

---

## npm run dev를 하면 nodemon을 통해 app.js가 실행되는 이유(수업과 동일) :

"scripts": {
"dev": "nodemon ./src/app.js"
},

- package.json 안에 "scripts" 내부에 "dev": "nodemon ./src/app.js" 이라고 작성했습니다.
- npm run dev 를 실행하면 src 내부에 있는 app.js를 nodemon으로 실행하겠다는 의미입니다.

# `공부의 숲` 팀 프로젝트 백엔드 구성 방법 및 가이드

## 1. 깃 클론 이후 `백엔드 프로젝트 초기화`하기

---

### 초기화 방법

- 빈 디렉토리에서 콘솔을 열어 아래의 순서대로 코드를 입력해주세요.
- 저장소를 `git clone` 하는 과정을 `0번 항목`에 작성했습니다.
- `backend/README.md`와 `backend/package.json`이 있는 경로에서 콘솔을 열었다면, `2번 항목`까지는 스킵하고 `3번 항목 npm install`부터 실행하세요.

---

### 단계별 실행

0. `git clone <포크한 저장소의 깃 클론 URL>`  
   내 컴퓨터에 저장소를 클론합니다.

1. `cd study-forest/`  
   프로젝트 디렉토리로 이동합니다.

2. `cd backend/`  
   백엔드 디렉토리로 이동합니다.

3. `npm install`  
   필요한 패키지를 설치합니다.

4. `npm run dev`  
   서버를 실행합니다.

5. 서버가 실행된 채로 새로운 콘솔을 하나 더 엽니다.

6. 새로운 콘솔에서 `curl http://localhost:5090/health-check`  
   헬스체크 요청을 보냅니다. (`curl`은 콘솔에서 간단한 GET request를 보내는 명령어입니다.)

7. 새로운 콘솔에 `헬스체크 성공!`이 뜨고, 서버 콘솔에서 `OK`가 보이면 초기화 완료입니다.

---

8. 스튜디오를 열어 DB를 확인하려면, 먼저 아래 컨벤션을 따라 `.env` 파일을 작성해 주세요.

9. `npx prisma generate` ||
   `.env` 파일 작성 후 명령어를 실행하여 프리즈마 설정을 적용해 주세요.

10. `npx prisma studio` || 를 실행해 보세요. 왼쪽 화면에 테이블이 잘 클릭되는지, 데이터가 원활히 불러와지는지 확인해 보세요.

---

## 2. 헬스체크 성공 후 해야 하는 일 (DB 연결을 위한 `.env` 파일 작성)

![image](https://github.com/user-attachments/assets/5a0491da-c385-4677-a10a-595b66be408d)

- [환경 설정 컨벤션](https://www.notion.so/1bbe3739a96a817f992eef3d9a09aa9b)을 참고하여 `.env` 파일을 `backend/` 경로에 작성해야 원격 데이터베이스에 연결할 수 있습니다.

- 백엔드 루트 경로, README.md와 Package.json 파일이 보이는 곳에 같이

---

## 3. DB에 제대로 연결됐는지 확인하는 방법

- `npx prisma studio`  
  프리즈마 스튜디오를 열어 DB 연결 상태를 확인하고, 데이터베이스에 어떤 정보가 들어 있는지 확인할 수 있습니다.

---

## 4. `client.prisma.js` 파일에 대해

- `src/db/prisma/client.prisma.js`는 프리즈마 ORM 기능을 사용하기 위해 작성된 파일입니다.
- `const prisma = require("../db/prisma/client.prisma")`로 해당 파일을 임포트하여 `prisma` 객체를 사용해 ORM 기능을 활용할 수 있습니다.

---

## 5. 프리즈마 설치 방법

- 프리즈마는 첫 설치 시 아래 공식 문서를 참고하여 설치했습니다:  
  [프리즈마 퀵스타트 PostgreSQL 버전](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

---

## 6. 폴더 구조

- `src/db/prisma/schema.prisma` : 프리즈마 ORM에서 사용하는 스키마 모델. 기본적인 DB 모델을 설계할 수 있습니다.
- `src/middlewares/errorHandler.module.js` : 서버 내부 에러 발생 시 기본적인 500 서버 에러를 발생시키는 미들웨어입니다.
- `src/modules/index.module.js` : 라우팅을 위한 기본 루트 경로. 여기에서 `user.module.js`나 `study.module.js` 등을 불러와 사용합니다.
- `src/modules/healthCheck.module.js` : 프로젝트 초기화 시 헬스체크를 위한 모듈입니다. `npm install` 후 `npm run dev`로 서버를 실행하고, `curl http://localhost:5090/health-check` 명령어로 헬스체크를 실행합니다.

---

## 7. 초기화 시 설치한 패키지

- `npm install express @types/express nodemon cors`
  - `express` : 백엔드 서버를 구동하기 위해 필요한 프레임워크입니다.
  - `@types/express` : TypeScript 환경에서 express를 사용하기 위해 필요합니다.
  - `nodemon` : 코드가 변경되면 자동으로 서버를 재시작합니다.
  - `cors` : 브라우저에서 발생하는 CORS 이슈를 방지하기 위해 설치합니다.

---

## 8. `npm run dev` 실행 시 `nodemon`을 통해 `app.js`가 실행되는 이유

- `package.json` 내 `"scripts"`에 `"dev": "nodemon ./src/app.js"`가 작성되어 있기 때문입니다.
- `npm run dev`를 실행하면 `src` 폴더 내 `app.js`를 `nodemon`으로 실행하는 것입니다.

---

## 9. 프리즈마 파일 경로 변경 시 위치 설정 방법

- `package.json` 내 `"prisma"` 항목에 `schema` 경로를 설정해줍니다.

```json

"prisma": {
  "schema": "./src/db/prisma/schema.prisma"
}

```

- 이렇게 설정하면 npx prisma migrate 실행 시 경로 오류를 방지할 수 있습니다.

---

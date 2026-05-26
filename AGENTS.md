<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Architecture (Feature-Sliced Design)

이 프로젝트는 **FSD(Feature-Sliced Design)** 를 따른다. Next.js App Router와 함께 사용한다.

## 레이어 (위 → 아래로만 import)

```
app → widgets → features → entities → shared
```

| 레이어       | 역할                                           | 경로                | alias                    |
| ------------ | ---------------------------------------------- | ------------------- | ------------------------ |
| **app**      | 라우트, 레이아웃, metadata. 페이지는 얇게 유지 | `src/app/`          | —                        |
| **widgets**  | 화면 단위 UI 조합 (header, sidebar 등)         | `src/Widgets/`      | `@Widgets`               |
| **features** | 사용자 시나리오·액션 (로그인, 필터, 제출 등)   | `src/features/`     | `@/features/...`         |
| **entities** | 비즈니스 엔티티 (user, project, task 등)       | `src/entities/`     | `@/entities/...`         |
| **shared**   | 재사용 UI·API·유틸 (도메인 무관)               | 아래 shared 표 참고 | `@components`, `@api`, … |

### shared 세부 (alias)

| 용도                        | 경로              | alias         |
| --------------------------- | ----------------- | ------------- |
| UI kit (Button, Input 등)   | `src/components/` | `@components` |
| API 클라이언트·fetcher      | `src/api/`        | `@api`        |
| 공통 hooks                  | `src/hooks/`      | `@hooks`      |
| 유틸·헬퍼                   | `src/util/`       | `@util`       |
| 에셋 import·상수            | `src/asset/`      | `@asset`      |
| 전역/공유 reducer (필요 시) | `src/reducer/`    | `@reducer`    |
| 그 외 `src/` 하위           | `src/**`          | `@/`          |

## 슬라이스 구조

각 `features`, `entities`, `widgets` 슬라이스는 아래 세그먼트를 가질 수 있다.

```
{slice}/
  ui/          # React 컴포넌트
  model/       # 상태, hooks, store
  api/         # 슬라이스 전용 API
  lib/         # 슬라이스 전용 유틸
  index.ts     # public API (외부 노출 export만)
```

- 슬라이스 **밖**에서는 `index.ts`를 통해서만 import한다.
- 슬라이스 **내부**에서는 상대 경로(`./`) 사용 가능.

## import 규칙

1. **상위 레이어 → 하위 레이어만** (예: `features` → `entities`, `shared` ✅ / `entities` → `features` ❌)
2. **같은 레이어 슬라이스 간 직접 import 금지** (예: `features/auth` → `features/cart` ❌). 공통 로직은 `shared` 또는 `entities`로 내린다.
3. **`app`에는 비즈니스 로직 금지** — `widgets` / `features` 조합과 data 연결만.
4. import 순서는 Prettier(`@ianvs/prettier-plugin-sort-imports`) 설정을 따른다.
5. 타입은 `import type`으로 분리한다 (ESLint `consistent-type-imports`).

## Next.js (app 레이어)

- `src/app/**/page.tsx` — 라우트 엔트리. 가능한 한 `widgets` / `features`만 조합.
- `src/app/**/layout.tsx` — 공통 레이아웃.
- Server Component / Client Component 구분은 Next.js 16 문서 기준.
- RSC에서 클라이언트 전용 코드는 `'use client'` 경계 아래로.

## 파일·네이밍

- 디렉터리: `kebab-case` (예: `user-profile`)
- 컴포넌트 파일: `kebab-case.tsx` 또는 팀 컨벤션에 맞게 `PascalCase.tsx`
- 새 기능 추가 시 **어느 레이어/슬라이스에 둘지** 먼저 정한 뒤 생성한다.

## 새 코드 체크리스트

- [ ] 올바른 레이어·슬라이스에 생성했는가?
- [ ] cross-slice / 역방향 import가 없는가?
- [ ] `app`에 도메인 로직을 넣지 않았는가?
- [ ] public API(`index.ts`)만 외부에서 import하는가?

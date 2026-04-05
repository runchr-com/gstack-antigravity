# gStack-Antigravity

[English README](./README.md)

gStack-Antigravity는 [garrytan/gstack](https://github.com/garrytan/gstack)을 Antigravity 환경에 맞게 팀 사용 중심으로 포팅한 저장소입니다.
`gstack-origin`의 업스트림 절차는 유지하면서, `.agents/workflows`와 `.agents/rules`로 프로젝트 단위의 일관된 실행을 보장합니다.

## 왜 이 저장소를 쓰나
단순 프롬프트 1회 실행은 누구나 할 수 있지만,
팀이 반복 가능한 방식으로 높은 품질을 유지하는 건 어렵습니다.

이 저장소의 목적:
- 업스트림 gstack 절차 유지 (`gstack-origin`)
- 프로젝트 제어 계층 유지 (`.agents/*`)
- 팀원 온보딩/재현성 단순화

## 동작 구조
런타임 레이어:
- `gstack-origin/`: 업스트림 원본 스킬 문서(`SKILL.md`)
- `.agents/workflows/`: 명령 진입점과 실행 단계
- `.agents/rules/`: 정책, 역할 라우팅, 공통 제약
- `.agents/skills/gstack/`: Antigravity가 참조하는 로컬 설치 스킬 페이로드

설계 의도:
- **컨텍스트 효율**: rules는 얇게 유지하고, 필요 시 `gstack-origin` 상세 절차를 로드
- **원본 동작 유지**: 실제 절차는 upstream skill 문서를 기준으로 실행
- **팀 일관성**: 저장소 안의 동일한 workflows/rules를 팀이 공유

## 준비물
- Antigravity 설치
- Git 설치
- 이 저장소 접근/클론 가능

권장:
- sync/update 전에는 작업 트리를 가능한 깨끗하게 유지
- `gstack-origin/browse/setup` 실행 가능한 브라우저 환경

## 빠른 시작 (3분)
1. 클론:
```bash
git clone https://github.com/runchr-com/gstack-antigravity.git
cd gstack-antigravity
```
2. browse 바이너리 빌드(최초 1회):
```bash
cd gstack-origin/browse
./setup
cd ../..
```
3. 로컬 스킬 설치 (권장):
```bash
npx @runchr/gstack-antigravity
```

대안: GitHub 저장소에서 바로 실행
```bash
npx github:runchr-com/gstack-antigravity
```

수동 스크립트 설치 (기여/개발용):
```bash
./scripts/install-antigravity-skill.sh copy
# Windows PowerShell:
./scripts/install-antigravity-skill.ps1 -Mode copy
```

4. Antigravity에서 프로젝트를 열고 `/office-hours` 실행

## 상세 설정 가이드
### 1) 로컬 경로 확인
설치 후 아래 경로 존재 확인:
- `.agents/skills/gstack`
- `.agents/workflows`
- `.agents/rules`

PowerShell 확인:
```powershell
Test-Path .agents/skills/gstack
Test-Path .agents/workflows
Test-Path .agents/rules
```

### 2) 설치 모드 선택
설치 스크립트 모드:
- `copy`(기본): `.agents/skills/gstack`에 파일 복사
- `link`: 저장소 개발 시 빠른 반영을 위한 심볼릭 링크

예시:
```bash
./scripts/install-antigravity-skill.sh copy
./scripts/install-antigravity-skill.sh link
```
```powershell
./scripts/install-antigravity-skill.ps1 -Mode copy
./scripts/install-antigravity-skill.ps1 -Mode link
```

팀 안정성은 `copy`, 저장소 개발자는 `link` 권장.

## 첫 워크플로우 테스트 (권장)
아래 순서로 스모크 테스트:
1. `/office-hours`
2. 만들고 싶은 문제를 2~3문장으로 입력
3. 구조화된 질문이 나오는지 확인
4. `/plan-ceo-review`
5. `/review`

통과 기준:
- 명령 호출 시 missing skill 에러 없음
- 워크플로우 단계형 출력이 보임
- rules가 일관되게 적용됨

## 일상 사용 가이드
### A. 문제정의 / 전략
- `/office-hours`: 문제와 사용자 pain 정리
- `/plan-ceo-review`: 전략/범위 검증
- `/plan-eng-review`: 아키텍처/구현 리스크 검증

### B. 구현 / 검증
- 코드 구현
- `/review`: 머지 전 코드 리스크 점검
- `/qa`: 브라우저 기반 QA

### C. 릴리즈 / 사후관리
- `/ship`: 릴리즈 준비
- `/document-release`: 문서 동기화
- `/retro`: 회고

## 팀 운영 패턴 (추천)
기능 브랜치마다:
1. `/office-hours` + `/plan-*`로 계획 확정
2. 구현
3. `/review`
4. `/qa`
5. 배포

주간 운영:
1. `/retro`로 반복 이슈 파악
2. `.agents/*` 개선
3. 변경사항을 커밋/변경기록으로 공유

## 업스트림 동기화 (`gstack-origin`)
업스트림 절차 최신화가 필요할 때 실행:

- macOS/Linux:
```bash
./scripts/sync-gstack-origin.sh
```
- Windows PowerShell:
```powershell
./scripts/sync-gstack-origin.ps1
```

수동 방식:
```bash
git fetch gstack-upstream
git subtree pull --prefix gstack-origin gstack-upstream main --squash
```

동기화 후:
1. 로컬 설치 스크립트 재실행
2. `/office-hours`, `/review` 스모크 테스트
3. subtree 변경 + `.agents/*` 어댑터 변경 함께 커밋

## 문제 해결
### 스킬 미감지
1. `.agents/skills/gstack` 존재 확인
2. 설치 스크립트 `copy` 모드 재실행
3. Antigravity 세션/앱 재시작

### browse 관련 실패
1. 아래 재실행:
```bash
cd gstack-origin/browse
./setup
```
2. 로컬 설치 재실행
3. `/qa` 또는 browse 의존 워크플로우 재시도

### 동작이 갑자기 달라짐
1. `gstack-origin` 최근 업데이트 여부 확인
2. `.agents/rules` 라우팅 확인
3. 작은 diff로 `/review` 스모크 테스트

## FAQ
### `llms.txt`, `llms-full.txt`가 필수인가?
아니요. 선택적 컨텍스트 보조 파일입니다.

### `.agents/rules`만 있으면 `gstack-origin`은 없어도 되나?
아니요. `.agents/rules`는 경량 오케스트레이션이고 상세 절차는 `gstack-origin`에 있습니다.

### `.agents/skills/gstack`를 커밋해야 하나?
이 저장소 운영 방식에서는 커밋하는 것이 팀 재현성에 유리합니다.

## 참고
- 이 저장소는 **로컬 워크스페이스 사용**을 기준으로 최적화되어 있습니다.
- 런타임 동작은 `.agents/workflows`, `.agents/rules`, `.agents/skills/gstack` 기준입니다.

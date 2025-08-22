#!/bin/bash

# Dayprint Docker Container 실행 스크립트

# 환경 변수 설정
CONTAINER_NAME="dayprint"
IMAGE_NAME="dayprint:local"
PORT=3002

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Dayprint Docker Container 실행 스크립트${NC}"
echo ""

# Docker 설치 확인
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker가 설치되어 있지 않습니다. Docker를 먼저 설치해주세요.${NC}"
    exit 1
fi

# 기존 컨테이너가 실행 중인지 확인
if [ "$(docker ps -aq -f name=${CONTAINER_NAME})" ]; then
    echo -e "${YELLOW}⚠️  기존 ${CONTAINER_NAME} 컨테이너를 중지하고 제거합니다...${NC}"
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
fi

# Docker 이미지 빌드
echo -e "${GREEN}📦 Docker 이미지를 빌드합니다...${NC}"
cd /home/jnsia/dev/jnsia

docker build -t ${IMAGE_NAME} -f apps/web/dayprint/dockerfile .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker 이미지 빌드에 실패했습니다.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker 이미지 빌드 완료${NC}"
echo ""

# Docker 컨테이너 실행
echo -e "${GREEN}🐳 Docker 컨테이너를 실행합니다...${NC}"
docker run -d \
    --name ${CONTAINER_NAME} \
    -p ${PORT}:3000 \
    --restart unless-stopped \
    ${IMAGE_NAME}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dayprint 컨테이너가 성공적으로 실행되었습니다!${NC}"
    echo ""
    echo -e "${GREEN}📍 접속 정보:${NC}"
    echo -e "   - Local: http://localhost:${PORT}"
    echo -e "   - Container Name: ${CONTAINER_NAME}"
    echo ""
    echo -e "${YELLOW}유용한 명령어:${NC}"
    echo -e "   - 로그 보기: docker logs -f ${CONTAINER_NAME}"
    echo -e "   - 컨테이너 중지: docker stop ${CONTAINER_NAME}"
    echo -e "   - 컨테이너 시작: docker start ${CONTAINER_NAME}"
    echo -e "   - 컨테이너 재시작: docker restart ${CONTAINER_NAME}"
    echo -e "   - 컨테이너 제거: docker rm -f ${CONTAINER_NAME}"
else
    echo -e "${RED}❌ Docker 컨테이너 실행에 실패했습니다.${NC}"
    exit 1
fi
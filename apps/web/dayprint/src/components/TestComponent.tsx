import { Button, Card, Text } from '@jnsia/components';

export default function TestComponent() {
  return (
    <Card>
      <Text>@jnsia/components 패키지 테스트</Text>
      <Button onClick={() => alert('Components 패키지가 잘 작동합니다!')}>
        테스트 버튼
      </Button>
    </Card>
  );
}

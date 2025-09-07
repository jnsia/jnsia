import { SelectOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Button, Flex } from '@shared/ui';

type InteractionMode = 'drag' | 'select';

interface InteractionModeSelectProps {
  interactionMode: InteractionMode;
  onModeChange: (mode: InteractionMode) => void;
}

export default function InteractionModeSelect({
  interactionMode,
  onModeChange,
}: InteractionModeSelectProps) {
  return (
    <Flex gap={16} justify="center">
      <Flex gap={8}>
        <ZoomInOutlined />
        <Button
          variant={interactionMode === 'drag' ? 'primary' : 'outline'}
          onClick={() => onModeChange('drag')}
        >
          확대/축소
        </Button>
      </Flex>
      <Flex gap={8}>
        <SelectOutlined />
        <Button
          variant={interactionMode === 'select' ? 'primary' : 'outline'}
          onClick={() => onModeChange('select')}
        >
          선택
        </Button>
      </Flex>
    </Flex>
  );
}

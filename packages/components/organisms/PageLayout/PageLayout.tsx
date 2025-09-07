import useAppNavigation from '@shared/hooks/useAppNavigation';
import { Card } from '@shared/ui/molecules';
import React, { ReactNode } from 'react';

import Button from '../../atoms/Button';
import Flex from '../../atoms/Flex';
import Text from '../../atoms/Text';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  headerActions?: ReactNode;
  children: ReactNode;
  styles?: React.CSSProperties;
}

export default function PageLayout({
  title,
  subtitle,
  showBackButton = true,
  headerActions,
  children,
}: PageLayoutProps) {
  const { goToDashboard } = useAppNavigation();

  return (
    <Flex column gap={16}>
      <Card>
        <Flex justify="space-between" align="center">
          <Flex column gap={4}>
            <Flex align="baseline" gap={16}>
              {showBackButton && (
                <Button variant="secondary" onClick={goToDashboard}>
                  ← 홈으로
                </Button>
              )}
              <Text size={20} weight={600}>
                {title}
              </Text>
            </Flex>
            {subtitle && (
              <Text
                size={14}
                color="secondary"
                style={{ marginLeft: showBackButton ? 72 : 0 }}
              >
                {subtitle}
              </Text>
            )}
          </Flex>
          {headerActions && <Flex gap={16}>{headerActions}</Flex>}
        </Flex>
      </Card>

      <div>{children}</div>
    </Flex>
  );
}

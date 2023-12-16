import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Avatar } from ".";
import { useSelector } from "react-redux";
import { userReposStatus } from "../store/reducers/repos";

type DirectionType = "top" | "right" | "bottom" | "left";

interface ChevronProps {
  direction: DirectionType;
  expanded: string;
}

const Chevron = styled.div<ChevronProps>`
  border-style: solid;
  border-width: 0.125rem 0.125rem 0 0;
  height: 0.25rem;
  width: 0.25rem;
  transition: all 0.25s ease-in-out;

  transform: ${(p) => p.direction === "top" && "rotate(-45deg)"};
  transform: ${(p) => p.direction === "right" && "rotate(45deg)"};
  transform: ${(p) =>
    p.direction === "bottom" && p.expanded === "false" && "rotate(135deg)"};
  transform: ${(p) => p.direction === "left" && "rotate(-135deg)"};
`;

interface AccordionProps {
  title: string;
  children: ReactNode;
  avatarUrl?: string;
  index: number;
  isExpanded: boolean;
  onExpand: (index: number) => void;
}

const Container = styled.div`
  border: 0.125rem solid #1976d2;
  padding: 0.25rem 1.25rem;
  & + & {
    margin-top: -0.125rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
  cursor: pointer;
`;

const ContentWrapper = styled.div<{ height: number; expanded: string }>`
  max-height: ${(p) => (p.expanded === "true" ? `${p.height}px` : "0")};
  transition: max-height 0.25s ease-in-out;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 0 0 1rem;
  line-height: 1.5;
`;

export const Accordion = ({
  title,
  avatarUrl,
  children,
  index,
  isExpanded,
  onExpand,
}: AccordionProps): JSX.Element => {
  const status = useSelector(userReposStatus);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children, isExpanded, status]);

  const handleExpandToggle = useCallback(() => {
    onExpand(isExpanded ? -1 : index);
  }, [index, isExpanded, onExpand]);

  return (
    <Container>
      <TitleContainer onClick={handleExpandToggle}>
        <Title>
          {avatarUrl && <Avatar imageUrl={avatarUrl} size={30} />}
          {title}
        </Title>
        <Chevron direction="bottom" expanded={`${isExpanded}`} />
      </TitleContainer>
      <ContentWrapper height={contentHeight} expanded={`${isExpanded}`}>
        <Content ref={contentRef}>{children}</Content>
      </ContentWrapper>
    </Container>
  );
};

import React from "react";
import styled from "styled-components";

interface AvatarProps {
  imageUrl?: string;
  size?: number;
}

const AvatarContainer = styled.div<AvatarProps>`
  width: ${({ size }) => (size ? `${size}px` : "40px")};
  height: ${({ size }) => (size ? `${size}px` : "40px")};
  border-radius: 50%;
  overflow: hidden;
  margin: 0 10px 0 0;
`;

const AvatarImage = styled.img<AvatarProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Avatar: React.FC<AvatarProps> = ({ imageUrl, size }) => {
  return (
    <AvatarContainer size={size}>
      <AvatarImage src={imageUrl} alt="Avatar" size={size} />
    </AvatarContainer>
  );
};

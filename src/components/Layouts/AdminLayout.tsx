import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import { StyledAdminLayout } from 'components/Layouts/layout';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <StyledAdminLayout>
      <NavBar />
      <div className="main-wrapper">{children}</div>
    </StyledAdminLayout>
  );
}

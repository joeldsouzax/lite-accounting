import * as React from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="footer footer-center p-4 text-base-content">
      <aside>
        <p>
          &copy; {copyrightDate} {copyrightName}
          {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All
          rights reserved.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

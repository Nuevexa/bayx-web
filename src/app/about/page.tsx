import { redirect } from 'next/navigation';

// About page is hidden for now - redirect to home
const AboutPage = () => {
  redirect('/');
};

export default AboutPage;

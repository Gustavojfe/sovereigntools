import { useLanguage } from '@/hooks/use-language';
import Newsletter from '@/components/Newsletter';
import RichText from '@/components/RichText';

const AboutPage = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8">
      <div className="bg-card shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">{t('about.title')}</h2>
        <div className="prose prose-blue dark:prose-invert max-w-none">
          {/* Introduction */}
          <p><RichText content={t('about.intro1')} /></p>
          <p><RichText content={t('about.intro2')} /></p>
          <p><RichText content={t('about.intro3')} /></p>
          
          {/* Our Story */}
          <h3 className="text-xl font-semibold mt-6 mb-4">{t('about.ourStory')}</h3>
          <p><RichText content={t('about.story1')} /></p>
          <p><RichText content={t('about.story2')} /></p>
          
          {/* Who We Are */}
          <h3 className="text-xl font-semibold mt-6 mb-4">{t('about.whoWeAre')}</h3>
          <ul>
            <li><RichText content={t('about.person1')} /></li>
            <li><RichText content={t('about.company1')} /></li>
          </ul>
          
          {/* Methodology */}
          <h3 className="text-xl font-semibold mt-6 mb-4">{t('about.methodology')}</h3>
          <p><RichText content={t('about.methodologyIntro')} /></p>
          <ul>
            <li><RichText content={t('about.method1')} /></li>
            <li><RichText content={t('about.method2')} /></li>
            <li><RichText content={t('about.method3')} /></li>
            <li><RichText content={t('about.method4')} /></li>
          </ul>
          <p><RichText content={t('about.methodNote')} /></p>
          <p><RichText content={t('about.evaluations')} /></p>
          
          {/* Why It Matters */}
          <h3 className="text-xl font-semibold mt-6 mb-4">{t('about.whyItMatters')}</h3>
          <p><RichText content={t('about.why1')} /></p>
          <p><RichText content={t('about.why2')} /></p>
          <p><RichText content={t('about.why3')} /></p>
          
          {/* Future Plans */}
          <h3 className="text-xl font-semibold mt-6 mb-4">{t('about.futurePlans')}</h3>
          <p><RichText content={t('about.futurePlansIntro')} /></p>
          <ul>
            <li><RichText content={t('about.plan1')} /></li>
            <li><RichText content={t('about.plan2')} /></li>
            <li><RichText content={t('about.plan3')} /></li>
            <li><RichText content={t('about.plan4')} /></li>
          </ul>
          
          {/* Contribute */}
          <h3 className="text-xl font-semibold mt-6 mb-4">{t('about.contribute')}</h3>
          <p><RichText content={t('about.contributeIntro')} /></p>
          <ul>
            <li><RichText content={t('about.contrib1')} /></li>
            <li><RichText content={t('about.contrib2')} /></li>
            <li><RichText content={t('about.contrib3')} /></li>
          </ul>
          <p><RichText content={t('about.closing')} /></p>
          <p><RichText content={t('about.final')} /></p>
        </div>
      </div>
      
      {/* Newsletter component */}
      <Newsletter />
    </div>
  );
};

export default AboutPage;

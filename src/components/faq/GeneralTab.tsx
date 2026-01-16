import { client } from '@/sanity/lib/client';
import { allFaqItemsQuery } from '@/sanity/lib/queries';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

const GeneralTab = async () => {
  const faqItems: FaqItem[] = await client.fetch(allFaqItemsQuery);

  if (!faqItems || faqItems.length === 0) {
    return (
      <div className="mx-auto max-w-[850px] text-center py-12">
        <p className="text-secondary/60 dark:text-accent/60">No FAQs available yet.</p>
      </div>
    );
  }

  return (
    <Accordion
      className="mx-auto w-full max-w-[850px] space-y-4"
      defaultValue={faqItems[0]?._id || '1'}
      enableScrollAnimation={true}
      animationDelay={0.1}
      visibilityFallbackTimeout={800}>
      {faqItems.map((item, index) => (
        <AccordionItem
          className="dark:bg-background-7 rounded-[20px] bg-white px-6 sm:px-8"
          key={item._id}
          value={item._id}>
          <AccordionTrigger
            titleClassName="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent"
            className="flex w-full cursor-pointer items-center justify-between pt-5 pb-5 sm:pt-8 sm:pb-8"
            value={item._id}
            iconType="arrow">
            {item.question}
          </AccordionTrigger>
          <AccordionContent value={item._id}>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default GeneralTab;

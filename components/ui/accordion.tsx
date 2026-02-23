'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type AccordionType = 'single' | 'multiple';

type AccordionContextValue = {
  type: AccordionType;
  openValues: string[];
  collapsible: boolean;
  toggleValue: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<{ value: string } | null>(null);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
}

const Accordion = ({
  type = 'single',
  collapsible = false,
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) => {
  const initialValues = React.useMemo(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  }, [defaultValue]);

  const [openValues, setOpenValues] = React.useState<string[]>(initialValues);

  const toggleValue = React.useCallback(
    (value: string) => {
      setOpenValues((prev) => {
        const isOpen = prev.includes(value);

        if (type === 'single') {
          if (isOpen) return collapsible ? [] : prev;
          return [value];
        }

        if (isOpen) return prev.filter((item) => item !== value);
        return [...prev, value];
      });
    },
    [collapsible, type]
  );

  return (
    <AccordionContext.Provider value={{ type, openValues, collapsible, toggleValue }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = ({ className, value, children, ...props }: AccordionItemProps) => (
  <AccordionItemContext.Provider value={{ value }}>
    <div className={cn('border-b last:border-b-0', className)} {...props}>
      {children}
    </div>
  </AccordionItemContext.Provider>
);

const AccordionTrigger = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);

  if (!accordion || !item) {
    throw new Error('AccordionTrigger must be used inside Accordion and AccordionItem');
  }

  const isOpen = accordion.openValues.includes(item.value);

  return (
    <h4 className="flex">
      <button
        type="button"
        className={cn(
          'flex flex-1 items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline',
          className
        )}
        onClick={() => accordion.toggleValue(item.value)}
        aria-expanded={isOpen}
        {...props}
      >
        {children}
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>
    </h4>
  );
};

const AccordionContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);

  if (!accordion || !item) {
    throw new Error('AccordionContent must be used inside Accordion and AccordionItem');
  }

  const isOpen = accordion.openValues.includes(item.value);

  if (!isOpen) return null;

  return (
    <div className={cn('overflow-hidden pb-4 pt-0 text-sm', className)} {...props}>
      {children}
    </div>
  );
};

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

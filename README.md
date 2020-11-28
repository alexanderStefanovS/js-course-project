# model-generator

Курсов проект за предмета "JavaScript за напреднали" във ФМИ

 - Описание:
 
   Идеята на проекта е разработката на генератор на модели спрямо метаданните на подадена база от данни. Системата ще се състои от клиентска и сървърна част. 
   На клиентската част ще се осъществи въвеждането на данни за връзка с база от данни (url, username, password), след което потребителят ще има възможност да избира от таблиците на базата и колоните им, от които да се генерират моделите. На база на този избор ще се генерират файлове с моделите, които ще бъдат свалени като архив при клиента.
   Сървърната част ще осъществева връзката с базата от данни от подадената от потребителя информация и ще генерира файловете и архива с моделите чрез метаданните от базата.
  
  - Технологии:
   - Front-end: Angular
   - Back-end: Node.js/Express.js
  
  - Функционалности:
    - Въвеждане на информация за базата и осъществяване на връзка с нея;
    - Избор на таблици и прилежащите им колони от генериран списък от метаданните на базата;
    - Генериране и сваляна на .ts (TypeScript) файлове с моделите, които съдържат полета, отговарящи на колоните от базата, гетъри и сетъри и походящ конструктур.

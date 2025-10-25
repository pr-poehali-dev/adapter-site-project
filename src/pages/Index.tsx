import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Zap" className="text-accent" size={28} />
              <span className="text-xl font-bold text-foreground">Adapter</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['hero', 'pricing', 'ceo', 'projects', 'reviews'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeSection === section ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'hero' ? 'Главная' : 
                   section === 'pricing' ? 'Прайс' : 
                   section === 'ceo' ? 'CEO' : 
                   section === 'projects' ? 'Проекты' : 'Отзывы'}
                </button>
              ))}
            </div>
            <Button className="bg-accent hover:bg-accent/90">Связаться</Button>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Маршрутизация запросов<br />
              <span className="text-accent">нового поколения</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Профессиональная система для обработки событий и интеллектуальной маршрутизации запросов в режиме реального времени
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Начать работу
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('pricing')}>
                Посмотреть прайс
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: 'Network', title: 'Маршрутизация', desc: 'Умная система распределения нагрузки' },
              { icon: 'Sparkles', title: 'Обработка событий', desc: 'Реакция на события в реальном времени' },
              { icon: 'Shield', title: 'Надёжность', desc: 'Отказоустойчивая архитектура' }
            ].map((feature, i) => (
              <Card key={i} className="border-border hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader>
                  <Icon name={feature.icon as any} className="text-accent mb-3" size={32} />
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Прайс</h2>
          <p className="text-center text-muted-foreground mb-12">Выберите подходящий тариф для вашего проекта</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Старт', price: '9 990', requests: '100К', support: '8/5' },
              { name: 'Бизнес', price: '29 990', requests: '500К', support: '24/7', popular: true },
              { name: 'Энтерпрайз', price: '79 990', requests: 'Безлимит', support: '24/7' }
            ].map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? 'border-accent border-2 shadow-xl' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярный
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-foreground">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-foreground mt-4">
                    {plan.price} ₽<span className="text-lg text-muted-foreground">/мес</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Check" className="text-accent" size={20} />
                      {plan.requests} запросов
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Check" className="text-accent" size={20} />
                      Поддержка {plan.support}
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Check" className="text-accent" size={20} />
                      Мониторинг
                    </li>
                  </ul>
                  <Button className={`w-full mt-6 ${plan.popular ? 'bg-accent hover:bg-accent/90' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="ceo" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Icon name="User" size={96} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Алексей Петров</h2>
              <p className="text-xl text-accent mb-4">CEO & Основатель</p>
              <p className="text-muted-foreground leading-relaxed">
                С 2015 года мы разрабатываем решения для enterprise-компаний. За это время наша команда реализовала более 200 проектов для крупнейших компаний России и СНГ. Наша миссия — создавать надёжные системы, которые работают безупречно даже под высокой нагрузкой.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Проекты</h2>
          <p className="text-center text-muted-foreground mb-12">Компании, которые доверяют нам</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Финтех Банк', metric: '2M запросов/день', desc: 'Система обработки транзакций в режиме реального времени' },
              { title: 'E-commerce Гигант', metric: '500K событий/час', desc: 'Маршрутизация заказов и уведомлений для интернет-магазина' },
              { title: 'Телеком Оператор', metric: '99.99% uptime', desc: 'Обработка событий сети для 10M абонентов' },
              { title: 'SaaS Платформа', metric: '50TB данных/мес', desc: 'Интеллектуальная маршрутизация API-запросов' }
            ].map((project, i) => (
              <Card key={i} className="border-border hover:border-accent transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-foreground">{project.title}</CardTitle>
                    <Icon name="TrendingUp" className="text-accent" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-accent">{project.metric}</div>
                  <CardDescription className="text-muted-foreground mt-2">{project.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Отзывы</h2>
          <p className="text-center text-muted-foreground mb-12">Что говорят наши клиенты</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Мария Соколова', role: 'CTO, FinanceApp', text: 'Отличная производительность и стабильность. Миграция прошла безболезненно.' },
              { name: 'Дмитрий Иванов', role: 'Тех. директор, ShopMart', text: 'Поддержка на высшем уровне. Все вопросы решаются оперативно.' },
              { name: 'Ольга Новикова', role: 'DevOps Lead, TelecomPro', text: 'Масштабируемость впечатляет. Система справляется с любой нагрузкой.' }
            ].map((review, i) => (
              <Card key={i} className="border-border">
                <CardHeader>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Icon key={j} name="Star" className="text-accent fill-accent" size={16} />
                    ))}
                  </div>
                  <CardDescription className="text-muted-foreground italic">&ldquo;{review.text}&rdquo;</CardDescription>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Zap" className="text-accent" size={24} />
              <span className="font-bold text-foreground">Adapter</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2024 Adapter. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

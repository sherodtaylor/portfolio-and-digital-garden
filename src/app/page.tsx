import { Container } from '@/components/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { StrengthsSection } from '@/components/sections/StrengthsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CommunitySection } from '@/components/sections/CommunitySection'
import { Card } from '@/components/Card'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import MotionDiv from '@/components/motion-div'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

export default async function Home() {
  const fetchedArticles = await getAllArticles()
  const articles = fetchedArticles?.slice(0, 3) || []

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Core Strengths Section */}
      <StrengthsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Community Section */}
      <CommunitySection />

      {/* Latest Articles Section */}
      <Container className="mt-24 md:mt-28">
        <MotionDiv>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Thoughts on software development, leadership, and technology
            </p>
          </div>
        </MotionDiv>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles?.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>

        {articles.length > 0 && (
          <MotionDiv className="mt-12 text-center">
            <Card.Link href="/articles">
              <span className="text-base font-medium text-primary hover:text-primary/80">
                View all articles →
              </span>
            </Card.Link>
          </MotionDiv>
        )}
      </Container>
    </>
  )
}

import Container from "@/components/container";
import Link from "next/link";

export default function About() {
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        Codewithhridoy
      </h1>
      <div className="text-center">
        <p className="text-lg">
          Your Source for Code Examples and Tutorials
        </p>
      </div>

      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <p>
          Welcome to Codewithhridoy, your go-to destination for learning
          HTML, CSS, JavaScript, React, and Next.js through practical
          code examples and tutorials.
        </p>
        <p>
          Whether you're a beginner looking to kickstart your coding
          journey or an experienced developer seeking insights into
          the latest techniques and best practices, our platform
          offers a diverse range of resources to suit your needs.
        </p>
        <p>
          Explore our comprehensive collection of code snippets,
          project walkthroughs, and step-by-step guides crafted to
          enhance your skills and empower you to bring your ideas to
          life in the digital realm.
        </p>
        <p>
          Have a specific topic in mind or want to contribute to our
          community? <Link href="/contact">Get in touch</Link> with us
          today!
        </p>
      </div>
    </Container>
  );
}

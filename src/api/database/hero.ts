import { getHeroContent, updateHeroContent } from '../../lib/database';

export async function GET() {
  try {
    const heroData = getHeroContent();
    
    if (heroData) {
      return Response.json({
        title: heroData.title,
        subtitle: heroData.subtitle,
        description: heroData.description,
        heroImage: heroData.hero_image,
        ctaButton: {
          text: heroData.cta_button_text,
          link: heroData.cta_button_link
        }
      });
    } else {
      // Return default data if no records found
      const defaultData = {
        title: "Sunflower Academy",
        subtitle: "Inspiring Excellence Building Future",
        description: "Sunflower Academy offers a well-rounded education that blends academic excellence with creativity, innovation, and real-world skills.",
        heroImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        ctaButton: {
          text: "Explore Our Campus",
          link: "#about"
        }
      };
      return Response.json(defaultData);
    }
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to fetch hero content',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    updateHeroContent(data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to update hero content',
      details: error.message
    }, { status: 500 });
  }
}
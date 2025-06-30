import { getAboutContent, updateAboutContent } from '../../lib/database';

export async function GET() {
  try {
    const aboutData = getAboutContent();
    
    if (aboutData) {
      return Response.json({
        vision: {
          title: "Our Vision",
          content: aboutData.vision_content
        },
        mission: {
          title: "Our Mission",
          content: aboutData.mission_content
        },
        coreValues: {
          title: "Our Core Values",
          values: aboutData.coreValues.map((cv: any) => ({
            name: cv.name,
            description: cv.description
          }))
        },
        history: {
          title: "Our History",
          content: aboutData.history_content
        }
      });
    } else {
      // Return default data if no records found
      const defaultData = {
        vision: {
          title: "Our Vision",
          content: "To be a leading institution recognized for academic excellence, holistic development, and innovation."
        },
        mission: {
          title: "Our Mission",
          content: "To provide quality education that nurtures intellectual curiosity, creativity, and character development."
        },
        coreValues: {
          title: "Our Core Values",
          values: [
            { name: "Excellence", description: "Striving for the highest standards in everything we do." },
            { name: "Integrity", description: "Acting with honesty, ethics, and responsibility." }
          ]
        },
        history: {
          title: "Our History",
          content: "Founded in 1995, Sunflower Academy has grown from a small neighborhood school to one of the region's most respected educational institutions."
        }
      };
      return Response.json(defaultData);
    }
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to fetch about content',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    updateAboutContent(data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to update about content',
      details: error.message
    }, { status: 500 });
  }
}
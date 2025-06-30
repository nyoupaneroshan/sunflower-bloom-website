import { getContactInfo, updateContactInfo } from '../../lib/database';

export async function GET() {
  try {
    const contactData = getContactInfo();
    
    if (contactData) {
      return Response.json({
        title: contactData.title,
        address: contactData.address,
        phone: contactData.phone,
        email: contactData.email,
        mapUrl: contactData.map_url
      });
    } else {
      // Return default data if no records found
      const defaultData = {
        title: "Contact Information",
        address: "Tarakeshwor- 06, KTM",
        phone: "(977) 01-5136321",
        email: "sfa2061@gmail.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4032.0402149898878!2d85.2998052!3d27.750960300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18cce4ffffe7%3A0x161276d0d897c665!2sSunflower%20Academy%20(English%20Medium%20SS)!5e1!3m2!1sen!2snp!4v1750232702113!5m2!1sen!2snp"
      };
      return Response.json(defaultData);
    }
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to fetch contact info',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    updateContactInfo(data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to update contact info',
      details: error.message
    }, { status: 500 });
  }
}
import { Image } from "@nextui-org/react";
import Contact from "../contact-us/page";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Michael Scott",
      role: "CEO",
      image: "https://i.ibb.co/LRVq4J0/elegant-businessman-with-document.jpg",
      bio: "Michael is the visionary behind our company. With over 20 years of experience in the industry, he leads our team with a focus on innovation and excellence.",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image:
        "https://i.ibb.co/yV2kQNf/premium-photo-1661590863910-69abf33b8f3f-blend-000000-blend-alpha-10-blend-mode-normal-blend-w-1-cro.jpg",
      bio: "Jane is our technology guru. She is responsible for overseeing all technical aspects and drives our tech strategy forward.",
    },
    {
      name: "Jordan Smith",
      role: "HR",
      image:
        "https://i.ibb.co/GTwG8Cj/jeremy-mcgilvrey-Mum-4d-B0-Vs-E-unsplash.jpg",
      bio: "Jordan is our HR guru. He is responsible for overseeing all human resources aspects and drives our HR strategy forward.",
    },
  ];

  return (
    <div className="mb-10  rounded-2xl min-h-screen">
      <section className="bg-background py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-3xl">
                About Pawprints & Tales
              </h2>
              <p className="mt-4 text-muted-foreground">
                Pawprints & Tales is your trusted companion for all things
                pet-related, founded with a passion for pets in 2015. With
                nearly a decade of experience in the pet care industry, we are
                dedicated to offering expert advice, practical tips, and
                heartwarming stories that nurture the bond between pets and
                their owners. Our mission is to provide pet lovers with the
                knowledge they need to ensure their pets live healthy, happy
                lives while celebrating the love, loyalty, and joy that pets
                bring into our lives every day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                Our Mission and Vision
              </h3>
              <p className="mt-4 text-muted-foreground">
                To provide pet owners with practical, trusted guidance that
                empowers them to give their pets the best care possible. Through
                a mix of expert tips, emotional stories, and resources, we aim
                to enrich the bond between pets and their owners, promoting
                responsible ownership, pet adoption, and the joy that comes with
                lifelong companionship. We are committed to making every pet's
                life better, one pawprint at a time.
              </p>
              <p className="mt-4 text-muted-foreground">
                To be the leading platform for pet care and pet-owner
                relationships, offering a comprehensive resource that sets new
                standards in pet well-being, responsible ownership, and
                community engagement. We envision a world where pets and their
                owners thrive together, supported by expert advice, heartwarming
                stories, and a shared commitment to a happy, healthy life for
                all pets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className=" py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center justify-center">
                  {" "}
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-32 h-32 mx-auto mb-4 flex items-center"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">
                  {member.name}
                </h3>
                <p className="text-blue-700 text-center">{member.role}</p>
                <p className=" mt-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <div>
        <Contact />
      </div>

      {/* Our Store Location Information */}
      <section className="bg-background py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mt-7 md:mt-10">
            <h3 className="text-3xl font-medium text-center tracking-tight text-foreground">
              Visit Our Store
            </h3>
            <div className="mt-4 rounded-lg border shadow-sm">
              <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.5753808979825!2d91.83636487522948!3d22.331893141749624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad275100d9f757%3A0x744c25eb0b06166a!2zMiBSIEMgQ2h1cmNoIFJkLCDgpprgpp_gp43gpp_gppfgp43gprDgpr7gpq4!5e0!3m2!1sbn!2sbd!4v1720693220657!5m2!1sbn!2sbd"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  // allowFullScreen=""
                  aria-hidden="false"
                  // tabIndex="0"
                  title="Acme Sports Store Location"
                />
              </div>
              <div className="p-4">
                <p className="font-medium text-foreground">Pawprints & Tales</p>
                <p className="mt-1 text-muted-foreground">
                  2 no R.C.Church road,Patherghata Chattogram, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

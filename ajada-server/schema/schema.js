const graphql = require("graphql");
const Bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const paypal = require("@paypal/checkout-server-sdk");
const _ = require("lodash");

// Creating an environment

let clientId = 'AUTmjOXhxX0I7KkbarRUvyvhsnf6J_eARDVGKfQcXvD_diWsB07_xz8S3nHxD9NVCYY0XI55dmv1m3cf';

let clientSecret = 'EIu7nADbPNsxKhDH49fWks1KTChX_YM7ftDWlP2qfxNTOO3q576WV0NJ9l_OuMmWq5DQVbdR0CM7q1lG';

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

const mongoose = require("mongoose");

const ObjectId = id => {
  return new mongoose.Types.ObjectId(id);
};

const Coupon = require("../models/coupon.js");
const Product = require("../models/product.js");
const Slide = require("../models/slide.js");
const Testimonial = require("../models/testimonial.js");
const Feedback = require("../models/feedback.js");
const User = require("../models/user.js");

const Home = require("../models/home.js");
const Footer = require("../models/footer.js");
const Contact = require("../models/contact.js");
const About = require("../models/about.js");
const Social = require("../models/social.js");

const Admin = require("../models/admin.js");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError,
  GraphQLInputObjectType
} = graphql;

const GraphQLDate = require("graphql-date");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "844244477226-2l0oiskbl1200upq4q76fdoock9i6kdh.apps.googleusercontent.com", // ClientID
  "spzGj5pXa2Bv5rWUBpoZSnEw", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: "1//04-kqwtB-jPGsCgYIARAAGAQSNwF-L9Ir_14MNy9VDqYMKYZjvGE0H_kILPxrk3hwjvgSEYiOrKq_LUo5id0pLCUErPxVjL6yUcg"
});
const accessToken = oauth2Client.getAccessToken();


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "1998skincareco@gmail.com", 
    clientId: "844244477226-2l0oiskbl1200upq4q76fdoock9i6kdh.apps.googleusercontent.com",
    clientSecret: "spzGj5pXa2Bv5rWUBpoZSnEw",
    refreshToken: "1//04-kqwtB-jPGsCgYIARAAGAQSNwF-L9Ir_14MNy9VDqYMKYZjvGE0H_kILPxrk3hwjvgSEYiOrKq_LUo5id0pLCUErPxVjL6yUcg",
    accessToken: accessToken
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendMail = async (
  email,
  subject = "Welcome to 1998 Skincare Co.",
  message = "Thank you for joining us! We will keep you updated with our latest products and discount offers :)",
  first = true
) => {

  var heading = `<h1><center>1998 Skincare Co.</center></h1>`;
  var people = "bcc",
    start = "",
    end = "";

  if (first) {
    heading = `<h1><center>${subject}</center></h1>`;
    people = "to";
    start = `<p class="c1">Hello there!</p>`;
    end = `<p class="c2">Sincerely,</p><p>1998 Skincare Co.</p>`;
  }

  var mailOptions = {
    from: `1998 Skincare Co.<${"1998skincareco@gmail.com"}>`,
    [people]: email,
    subject: subject,
    html: `<!doctype html>
          <html>
            <head>
              <style>
                
                *,
                *::before,
                *::after {
                  margin: 0;
                  padding: 0;
                  box-sizing: inherit;
                }

                html {
                  font-size: 100%;
                }

                body {
                  box-sizing: border-box;
                  padding: 0;
                  -webkit-tap-highlight-color: transparent;
                }

                .main {
                  padding: 2.4rem 1.2rem 6rem 1.2rem;
                  border-radius: 4px;
                }

                h1 {
                  margin-bottom: 2.4rem;
                  padding: 0 .4rem;
                  color: #193c46;
                  font-family: "Times";
                  font-size: 2.5rem;
                }

                p {
                  color: #193c46;
                  font-family: "Sans Serif";
                  font-size: 1.2rem;
                  line-height: 1.618em;
                  display: block;
                }

                .c1 {
                  margin-bottom: 1.8rem;
                }

                .c2{
                  margin-top: 1.8rem;
                }


              </style>
            </head>
            <body>
              <div class="main">
                ${heading}
                ${start}
                <div>
                  <p>${message}</p>
                </div>
                ${end}
              </div>
            </body>
          </html>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    return { created: true, email: false, message: e.message };
  }

  return { created: true, email: true, message: "Sent!" };
};

const AnyType = new GraphQLObjectType({
  name: "Any",
  fields: () => ({
    created: { type: GraphQLBoolean },
    not: { type: GraphQLBoolean },
    duplicate: { type: GraphQLBoolean },
    email: { type: GraphQLBoolean },
    coupon: { type: GraphQLBoolean },
    message: { type: GraphQLString }
  })
});

const HomeType = new GraphQLObjectType({
  name: "Home",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    tagline: { type: GraphQLString },
    summary: { type: GraphQLString },
    ship: { type: GraphQLString }
  })
});

const FooterType = new GraphQLObjectType({
  name: "Footer",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    privacy: { type: GraphQLString }
  })
});

const AboutType = new GraphQLObjectType({
  name: "About",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    heading: { type: GraphQLString },
    yourInfo: { type: GraphQLString },
    disclaimerInfo: { type: GraphQLString }
  })
});

const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    heading: { type: GraphQLString },
    info: { type: GraphQLString }
  })
});

const SocialType = new GraphQLObjectType({
  name: "Social",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    facebook: { type: GraphQLString },
    instagram: { type: GraphQLString },
    twitter: { type: GraphQLString }
  })
});

const FeedbackType = new GraphQLObjectType({
  name: "Feedback",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    message: { type: GraphQLString },
    email: { type: GraphQLString },
    date: { type: GraphQLDate }
  })
});

const SlideType = new GraphQLObjectType({
  name: "Slide",
  fields: () => ({
    id: { type: GraphQLID },
    heading: { type: GraphQLString },
    caption: { type: GraphQLString },
    photo: { type: GraphQLString }
  })
});

const TestimonialType = new GraphQLObjectType({
  name: "Testimonial",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    summary: { type: GraphQLString }
  })
});

const CouponType = new GraphQLObjectType({
  name: "Coupon",
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    discount: { type: GraphQLString }
  })
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    price: { type: GraphQLString },
    size: { type: GraphQLString }
  })
});

const InputItemType = new GraphQLInputObjectType({
  name: "InputItem",
  fields: () => ({
    price: { type: new GraphQLNonNull(GraphQLString) },
    size: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const InputProductType = new GraphQLInputObjectType({
  name: "InputProduct",
  fields: () => ({
    productId: { type: new GraphQLNonNull(GraphQLString) },
    size: { type: new GraphQLNonNull(GraphQLString) },
    count: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    item: { type: new GraphQLList(ItemType) },
    photo: { type: new GraphQLList(GraphQLString) },
    gender: { type: GraphQLString },
    summary: { type: GraphQLString },
    available: { type: GraphQLBoolean }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    payNow: {
      type: AnyType,
      args: {
        productIds: { type: new GraphQLNonNull(GraphQLList(InputProductType)) },
        instruct: { type: GraphQLString },
        coupon: { type: GraphQLString }
      },

      async resolve(parent, args, context) {
        var returnLink;
        var len = args.productIds.length;

        var total = 0.0;

        returnLink = process.env.CLIENT + "/cart";

        let q = [];

        for (let i = 0; i < len; i++) {
          let id = args.productIds[i].productId;

          if (Number(args.productIds[i].count) > Number(process.env.LIMIT)) {
            return {
              created: false,
              not: false,
              message: `Some of the products have exceeded the max limit of ${process.env.LIMIT}`
            };
          }

          try {
            ObjectId(id);
          } catch (e) {
            let x =
              "Please modify your cart list. Some of the products are not available.";

            if (len === 1) x = "Product not available.";

            return {
              created: false,
              not: true,
              message: x
            };
          }

          let product = await Product.findById(id);

          // Product not found in the list

          if (!product) {
            let x =
              "Please modify your cart. Some of the products are not available.";

            if (len === 1) x = "Product not available.";

            return {
              created: false,
              not: true,
              message: x
            };
          }

          // Product out of stock

          if (!product.available) {
            let x = `${product.name} is currently out of stock. Please remove it to proceed.`;

            if (len === 1) x = "Product is currently out of stock.";

            return {
              created: false,
              not: true,
              message: x
            };
          }

          let { item } = product;

          let { size } = args.productIds[i];
          let { count } = args.productIds[i];

          let queen = _.find(item, { size: size });

          if (!queen) {
            let x =
              "Please empty your cart. Some of the product quantities are not available.";

            if (len === 1) x = "Product quantity is not available.";

            return {
              created: false,
              not: true,
              message: x
            };
          }

          let g = {
            name: product.name + " (" + size + " oz.)",
            description: "For " + product.gender,
            sku: product.id,
            unit_amount: {
              currency_code: "USD",
              value: queen.price
            },
            quantity: count,
            category: "PHYSICAL_GOODS"
          };

          total += Number(queen.price) * Number(count);
          q.push(g);
        }

        total = total.toString();

        let house = await Home.findOne({ type: "Home" });
        let pc = house.ship; // Shipping $
        let dc = 0; // Discount %

        // spiderman

        if (args.coupon) {
          let palace = await Coupon.findOne({
            code: args.coupon
          });

          if (palace) {
            dc = palace.discount;
          } else {
            return {
              created: false,
              not: false,
              coupon: true,
              message: "Coupon does not exist."
            };
          }
        }

        // dc = (dc * total) / 100;

        dc = ((Number(dc) * Number(total)) / 100).toFixed(2);
        dc = dc.toString();

        // PayPal Payment Gateway -->

        let request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
          intent: "CAPTURE",
          application_context: {
            return_url: process.env.CLIENT + "/success",
            cancel_url: process.env.CLIENT + "/cart",
            brand_name: "1998 Skincare Co.",
            locale: "en-US",
            landing_page: "BILLING",
            user_action: "CONTINUE"
          },
          purchase_units: [
            {
              reference_id: "PUHF",
              description: "Skincare Products",

              custom_id: args.instruct, // User generated message
              soft_descriptor: "Skincare",
              amount: {
                currency_code: "USD",
                value: (Number(total) + Number(pc) - Number(dc)).toFixed(2).toString(),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: total
                  },
                  shipping: {
                    currency_code: "USD",
                    value: pc
                  },
                  discount: {
                    currency_code: "USD",
                    value: dc
                  }
                }
              },
              items: q
            }
          ]
        });

        // Call API with your client and get a response for your call

        var url = "";

        let createOrder = async function() {
          let response = await client.execute(request);
          // console.log(`Response: ${JSON.stringify(response)}`);
          // If call returns body in response, you can get the deserialized version from the result attribute of the response.
          let r = response.result.links;
          let p = _.find(r, { rel: "approve" });
          url = p["href"];
        };

        await createOrder();

        return { created: true, message: url };
      }
    },

    /*
    acceptPayment: {
      type: AnyType,

      args: {
        orderId: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        let captureOrder = async function(orderId) {
          let request = new paypal.orders.OrdersCaptureRequest(orderId);
          request.requestBody({});
          // Call API with your client and get a response for your call
          let response = await client.execute(request);
          // If call returns body in response, you can get the deserialized version from the result attribute of the response.
          console.log(response.result);
        };

        let capture = captureOrder(args.orderId);

        return { created: true };
      }
    },
*/
    updateHome: {
      type: HomeType,

      args: {
        tagline: { type: GraphQLString },
        summary: { type: GraphQLString },
        ship: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Home.findOneAndUpdate(
          { type: "Home" }, // Query parameter
          {
            // Replacement document
            tagline: args.tagline,
            summary: args.summary,
            ship: args.ship
          },
          { upsert: true, runValidators: true, context: "query" }
        );
      }
    },

    updateFooter: {
      type: FooterType,

      args: {
        privacy: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Footer.findOneAndUpdate(
          { type: "Footer" }, // Query parameter
          {
            // Replacement document
            privacy: args.privacy
          },
          { upsert: true, runValidators: true, context: "query" }
        );
      }
    },

    updateAbout: {
      type: AboutType,

      args: {
        heading: { type: GraphQLString },
        yourInfo: { type: GraphQLString },
        disclaimerInfo: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return About.findOneAndUpdate(
          { type: "About" }, // Query parameter
          {
            // Replacement document
            heading: args.heading,
            yourInfo: args.yourInfo,
            disclaimerInfo: args.disclaimerInfo
          },
          { upsert: true, runValidators: true, context: "query" }
        );
      }
    },

    updateContact: {
      type: ContactType,

      args: {
        heading: { type: GraphQLString },
        info: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Contact.findOneAndUpdate(
          { type: "Contact" }, // Query parameter
          {
            // Replacement document
            heading: args.heading,
            info: args.info
          },
          { upsert: true, runValidators: true, context: "query" }
        );
      }
    },

    updateSocial: {
      type: SocialType,

      args: {
        facebook: { type: GraphQLString },
        instagram: { type: GraphQLString },
        twitter: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Social.findOneAndUpdate(
          { type: "Social" }, // Query parameter
          {
            // Replacement document
            facebook: args.facebook,
            instagram: args.instagram,
            twitter: args.twitter
          },
          { upsert: true, runValidators: true, context: "query" }
        );
      }
    },

    addFeedback: {
      type: AnyType,

      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, context) {
        try {
          await Feedback.create({
            name: args.name || null,
            message: args.message || null,
            email: args.email || null,
            date: new Date()
          });
        } catch (e) {
          if (e.name === "ValidationError")
            return { created: false, message: "Invalid email." };
          else return { created: false, message: e.name };
        }

        return { created: false, message: "Thank You!" };
      }
    },

    deleteFeedback: {
      type: FeedbackType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Feedback.findOneAndDelete({ _id: args.id });
      }
    },

    addSlide: {
      type: SlideType,

      args: {
        heading: { type: new GraphQLNonNull(GraphQLString) },
        caption: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Slide.create({
          heading: args.heading || null,
          caption: args.caption || null,
          photo: args.photo || null
        });
      }
    },

    deleteSlide: {
      type: SlideType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Slide.findOneAndDelete({ _id: args.id });
      }
    },

    updateSlide: {
      type: SlideType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        heading: { type: new GraphQLNonNull(GraphQLString) },
        caption: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Slide.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            heading: args.heading,
            caption: args.caption,
            photo: args.photo
          },
          { new: true }
        );
      }
    },

    addTestimonial: {
      type: TestimonialType,

      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        summary: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Testimonial.create({
          name: args.name || null,
          summary: args.summary || null
        });
      }
    },

    deleteTestimonial: {
      type: TestimonialType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Testimonial.findOneAndDelete({ _id: args.id });
      }
    },

    updateTestimonial: {
      type: TestimonialType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        summary: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Testimonial.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            name: args.name,
            summary: args.summary
          },
          { new: true }
        );
      }
    },

    addCoupon: {
      type: CouponType,

      args: {
        code: { type: new GraphQLNonNull(GraphQLString) },
        discount: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Coupon.create({
          code: args.code || null,
          discount: args.discount || null
        });
      }
    },

    deleteCoupon: {
      type: CouponType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Coupon.findOneAndDelete({ _id: args.id });
      }
    },

    updateCoupon: {
      type: CouponType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        discount: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Coupon.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            code: args.code,
            discount: args.discount
          },
          { new: true }
        );
      }
    },

    /*

    changePassword: {
      type: AnyType,

      args: {
        old: { type: new GraphQLNonNull(GraphQLString) },
        newPass: { type: new GraphQLNonNull(GraphQLString) },
        reType: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        if (args.newPass !== args.reType) {
          return { created: false, message: "Passwords don't match." };
        }

        let user = await Admin.findOne({
          role: "sender"
        });

        if (user.password !== args.old) {
          return { created: false, message: "The old password is incorrect." };
        }

        if (args.newPass === args.old) {
          return {
            created: false,
            message: "New password cannot be same as the old password."
          };
        }

        await Admin.findOneAndUpdate(
          { role: "sender" }, // Query parameter
          {
            // Replacement document
            email: user.email,
            password: args.newPass
          }
        );

        return {
          created: true,
          message: "Password changed successfully."
        };
      }
    },

    */

    adminLogin: {
      type: AnyType,

      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, context) {
        let user = await Admin.findOne({
          email: args.email
        });

        if (!user) {
          return { created: false, message: "Email not found." };
        }

        var token;

        // if (Bcrypt.compareSync(args.password, user.password)) {
        if (args.password === user.password) {
          token = jwt.sign({ role: "admin" }, process.env.JWT, {
            algorithm: "HS256",
            expiresIn: "1y"
          });

          context.res.cookie("admin", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 365 * 24 * 60 * 60 * 1000
          });

          return { created: true };
        } else {
          return { created: false, message: "Incorrect password." };
        }
      }
    },

    adminLogout: {
      type: AnyType,

      resolve(parent, args, context) {
        context.res.cookie("admin", 0, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          maxAge: 0
        });

        return { value: true };
      }
    },

    /*

    addUser: {
      type: AnyType,

      args: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args) {
        var token = faker.lorem
          .words()
          .split(" ")
          .join("-");

        try {
          await User.create({
            firstname: args.firstname,
            surname: args.surname,
            email: args.email,
            password: Bcrypt.hashSync(args.password, 10),
            token: token,
            active: false,
            createdAt: new Date()
          });
        } catch (e) {
          return { created: false, duplicate: true, message: e.message };
        }

        return sendMail(args.firstname, args.email, token);
      }
    },

    tryUser: {
      type: AnyType,

      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args) {
        var token = faker.lorem
          .words()
          .split(" ")
          .join("-");

        var user = null;

        try {
          user = await User.findOne({ email: args.email });
          console.log(user);
        } catch (e) {
          return { created: false, message: e.message };
        }

        if (user === null) {
          return { created: false, message: "User not found." };
        }

        if (user.active) {
          return { created: false, message: "Account already verified!" };
        }

        try {
          await User.findOneAndUpdate(
            { email: args.email }, // Query parameter
            {
              token: token
            },
            { new: true }
          );

          return sendMail(user.firstname, args.email, token);
        } catch (e) {
          return { created: false, message: e.message };
        }
      }
    },

    verifyUser: {
      type: AnyType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, context) {
        var user = null;

        try {
          user = await User.findOne({ email: args.email });
        } catch (e) {
          return { created: false, message: e.message };
        }

        if (user === null) {
          return { created: false, message: "User not found." };
        }

        if (user.active) {
          return { created: false, message: "Account already verified!" };
        }

        if (user.token === args.token) {
          try {
            await User.findOneAndUpdate(
              { email: args.email }, // Query parameter
              {
                active: true
              },
              { new: true }
            );

            let token = jwt.sign({ email: user.email }, process.env.JWT, {
              algorithm: "HS256",
              expiresIn: "1y"
            });

            context.res.cookie("user", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              maxAge: 365 * 24 * 60 * 60 * 1000
            });

            return { created: true, message: "Verified!" };
          } catch (e) {
            return { created: false, message: e.message };
          }
        } else
          return { created: false, message: "Incorrect verification code." };
      }
    },

    userLogin: {
      type: AnyType,

      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, context) {
        let user = await User.findOne({
          email: args.email
        });

        if (!user) {
          return { created: false, message: "Email not found." };
        }

        var token;

        if (Bcrypt.compareSync(args.password, user.password)) {
          token = jwt.sign({ email: args.email }, process.env.JWT, {
            algorithm: "HS256",
            expiresIn: "1y"
          });

          context.res.cookie("user", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 365 * 24 * 60 * 60 * 1000
          });

          return { created: true };
        } else {
          return { created: false, message: "Incorrect password." };
        }
      }
    },

    userLogout: {
      type: AnyType,

      resolve(parent, args, context) {
        context.res.cookie("leanaToken", 0, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          maxAge: 0
        });

        return { value: true };
      }
    },

    /*    
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        return User.findOneAndDelete({ _id: args.id });
      }
    },
    
    updateUser: {
      type: UserType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args) {
        return User.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            firstname: args.firstname,
            surname: args.surname,
            email: args.email,
            password: Bcrypt.hashSync(args.password, 10)
          },
          { new: true }
        );
      }
    },
*/

    sendMail: {
      type: AnyType,
      args: {
        subject: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        let users = await User.find({});

        let emails = users.map(e => {
          return e["email"];
        });

        return sendMail(emails, args.subject, args.message, false);
      }
    },

    addUser: {
      type: AnyType,

      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, context) {
        let a = await User.findOne({ email: args.email });
        if (a) {
          return {
            created: false,
            duplicate: true,
            message: "Email already exists."
          };
        }

        try {
          await User.create({
            email: args.email || null
          });
        } catch (e) {
          if (e.name === "ValidationError")
            return { created: false, message: "Please enter a valid email." };
          else return { created: false, message: e.name };
        }

        return sendMail([args.email]);
      }
    },

    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return User.findOneAndDelete({ _id: args.id });
      }
    },

    addProduct: {
      type: ProductType,

      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        item: { type: new GraphQLNonNull(new GraphQLList(InputItemType)) },
        photo: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        summary: { type: GraphQLString },
        available: { type: GraphQLBoolean }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Product.create({
          name: args.name || null,
          item: args.item || null,
          photo: args.photo || null,
          gender: args.gender || null,
          summary: args.summary || null,
          available: args.available || null
        });
      }
    },

    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Product.findOneAndDelete({ _id: args.id });
      }
    },

    updateProduct: {
      type: ProductType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        item: { type: new GraphQLNonNull(new GraphQLList(InputItemType)) },
        photo: { type: new GraphQLList(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        summary: { type: GraphQLString },
        available: { type: GraphQLBoolean }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Product.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            name: args.name,
            item: args.item,
            photo: args.photo,
            gender: args.gender,
            summary: args.summary,
            available: args.available
          },
          { new: true }
        );
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    acceptPayment: {
      type: AnyType,

      args: {
        orderId: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        let captureOrder = async function(orderId) {
          let request = new paypal.orders.OrdersCaptureRequest(orderId);
          request.requestBody({});
          // Call API with your client and get a response for your call
          let response = await client.execute(request);
          // If call returns body in response, you can get the deserialized version from the result attribute of the response.
          console.log(response.result);
        };

        let capture = captureOrder(args.orderId);

        return { created: true, message: capture };
      }
    },

    home: {
      type: HomeType,
      resolve(parent, args) {
        return Home.findOne({ type: "Home" });
      }
    },

    footer: {
      type: FooterType,
      resolve(parent, args) {
        return Footer.findOne({ type: "Footer" });
      }
    },

    about: {
      type: AboutType,
      resolve(parent, args) {
        return About.findOne({ type: "About" });
      }
    },

    contact: {
      type: ContactType,
      resolve(parent, args) {
        return Contact.findOne({ type: "Contact" });
      }
    },

    social: {
      type: SocialType,
      resolve(parent, args) {
        return Social.findOne({ type: "Social" });
      }
    },

    feedback: {
      type: FeedbackType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Feedback.findById(args.id);
      }
    },

    feedbacks: {
      type: new GraphQLList(FeedbackType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Feedback.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Feedback.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Feedback.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Feedback.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    slide: {
      type: SlideType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Slide.findById(args.id);
      }
    },

    slides: {
      type: new GraphQLList(SlideType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Slide.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Slide.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Slide.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Slide.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    testimonial: {
      type: TestimonialType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Testimonial.findById(args.id);
      }
    },

    testimonials: {
      type: new GraphQLList(TestimonialType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Testimonial.find({
              _id: { [dt]: ObjectId(args.cursor) },
              $text: { $search: args.search }
            })
              .sort({ _id: sign })
              .limit(pos);
          }

          return Testimonial.find({ $text: { $search: args.search } })
            .sort({ _id: sign })
            .skip(miss)
            .limit(pos);
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Testimonial.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Testimonial.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    coupon: {
      type: CouponType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Coupon.findById(args.id);
      }
    },

    coupons: {
      type: new GraphQLList(CouponType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Coupon.find({
              _id: { [dt]: ObjectId(args.cursor) },
              $text: { $search: args.search }
            })
              .sort({ _id: sign })
              .limit(pos);
          }

          return Coupon.find({ $text: { $search: args.search } })
            .sort({ _id: sign })
            .skip(miss)
            .limit(pos);
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Coupon.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Coupon.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    product: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Product.findById(args.id);
      }
    },
    /*
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }

        return User.findById(args.id);
      }
    },
*/
    products: {
      type: new GraphQLList(ProductType),
      args: {
        search: { type: GraphQLString },
        gender: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            if (args.gender) {
              return Product.find({
                _id: { [dt]: ObjectId(args.cursor) },
                gender: args.gender,
                $text: { $search: args.search }
              })
                .sort({ _id: sign })
                .limit(pos);
            }

            return Product.find({
              _id: { [dt]: ObjectId(args.cursor) },
              $text: { $search: args.search }
            })
              .sort({ _id: sign })
              .limit(pos);
          }

          if (args.gender) {
            return Product.find({
              $text: { $search: args.search },
              gender: args.gender
            })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos);
          }

          return Product.find({ $text: { $search: args.search } })
            .sort({ _id: sign })
            .skip(miss)
            .limit(pos);
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          if (args.gender) {
            return Product.find({
              _id: { [dt]: ObjectId(args.cursor) },
              gender: args.gender
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Product.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.gender) {
          return Product.find({ gender: args.gender })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Product.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    users: {
      type: new GraphQLList(UserType),
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.role !== "admin") {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return User.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return User.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

export type ApprovedTestimonial = {
  id: string;
  quote: string;
  displayName: string;
  program: string;
  approvedForPublication: true;
};

// Public content only. Add an authentic quote after Francis approves its exact
// wording and display name, and the author gives permission to publish it.
// Keep pending submissions, email addresses, and approval records in Yahoo,
// never in this file: everything here is included in the public website.
export const approvedTestimonials: ApprovedTestimonial[] = [];

export const reviewEmail = "theathletelab@yahoo.com";
export const reviewEmailSubject = "The Athlete Lab — review for approval";
export const reviewEmailBody = [
  "Hi Coach Francis,",
  "",
  "I'd like to share my experience at The Athlete Lab.",
  "",
  "Display name (first name and last initial): ",
  "Program (Mini Soccer / Intro to Speed & Agility / Youth Sports Performance): ",
  "",
  "My review: ",
  "",
  "Permission to publish my review and display name on The Athlete Lab website (Yes / No): ",
  "",
  "I understand my review will be read by Coach Francis before any publication. My email address will not be displayed.",
].join("\n");

export const reviewEmailUrl = `mailto:${reviewEmail}?subject=${encodeURIComponent(reviewEmailSubject)}&body=${encodeURIComponent(reviewEmailBody)}`;

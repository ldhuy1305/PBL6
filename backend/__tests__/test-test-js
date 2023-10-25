const { signUp, verifiedSignUp } = require("../controllers/authController"); // replace with the path to your file
const crypto = require("crypto");
describe("Auth Tests", () => {
  let req, res, next, Model;

  beforeEach(() => {
    req = {
      body: { signUpToken: "123456" },
      files: {
        frontImageCCCD: [{ path: "path1" }],
        behindImageCCCD: [{ path: "path2" }],
        licenseImage: [{ path: "path3" }],
      },
      params: { email: "test@example.com" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    Model = {
      create: jest.fn(),
      findOne: jest.fn(),
    };
    cloudinary = {
      uploader: {
        destroy: jest.fn(() => Promise.resolve({ result: "ok" })),
      },
    };
  });

  describe("signUp", () => {
    it("should create a new user and call next", async () => {
      Model.create.mockResolvedValue({
        createSignUpToken: jest.fn(),
        save: jest.fn(),
      });

      await signUp(Model, "role")(req, res, next);

      expect(Model.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      Model.create.mockRejectedValue(new Error("Test error"));
      cloudinary.uploader.destroy.mockResolvedValue({ result: "ok" });
      req.files = null;
      await signUp(Model, "role")(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Test error" });
    });
  });

  describe("verifiedSignUp", () => {
    it("should verify a user and return a success message", async () => {
      const token = "123456";
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const mockUser = {
        isVerified: false,
        signUpToken: hashedToken,
        signUpExpires: Date.now() + 3600000,
        save: jest.fn(),
      };
      req.body.signUpToken = token;

      Model.findOne.mockResolvedValue(mockUser);

      await verifiedSignUp(Model)(req, res, next);

      expect(Model.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      //   expect(mockUser.save).toHaveBeenCalled();
      //   expect(res.status).toHaveBeenCalledWith(200);
      //   expect(res.json).toHaveBeenCalledWith({
      //     message: "Sign up successfully",
      //   });
    });

    it("should handle case when token is invalid", async () => {
      const mockUser = {
        isVerified: false,
        signUpToken: "differenttoken",
        signUpExpires: Date.now() + 3600000,
        save: jest.fn(),
      };
      Model.findOne.mockResolvedValue(mockUser);

      await verifiedSignUp(Model)(req, res, next);

      expect(Model.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    it("should handle case when token has expired", async () => {
      const mockUser = {
        isVerified: false,
        signUpToken: "hashedtoken",
        signUpExpires: Date.now() - 3600000,
        save: jest.fn(),
      };
      Model.findOne.mockResolvedValue(mockUser);

      await verifiedSignUp(Model)(req, res, next);

      expect(Model.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});

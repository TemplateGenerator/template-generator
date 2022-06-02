using Amazon.CognitoIdentityProvider;
//using Amazon.CognitoIdentityProvider.Model;
using Amazon.Extensions.CognitoAuthentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using template_generator.Models.Accounts;
using static template_generator.Common.Constants;

namespace template_generator.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly SignInManager<CognitoUser> _signInManager;
        private readonly UserManager<CognitoUser> _userManager;
        private readonly CognitoUserPool _cognitoUserPool;
        private readonly IConfiguration _configuration;
        private readonly AmazonCognitoIdentityProviderClient? _amazonCognitoIdentityProviderClient;

        public AccountsController(SignInManager<CognitoUser> signInManager,
                        UserManager<CognitoUser> userManager,
                        CognitoUserPool cognitoUserPool,
                        IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _cognitoUserPool = cognitoUserPool;
            _configuration = configuration;
        }

        [HttpGet("isauthenticated")]
        public bool IsAuthenticated()
        {
            if(User.Identity.IsAuthenticated)
                return true;
            return false;
        }

        [HttpPost("signin")]
        public async Task<SignInResponse> SignIn(SignIn model)
        {
            SignInResponse response = new SignInResponse();
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false).ConfigureAwait(false);
                if (result.Succeeded)
                {
                    response.Code = StatusCodes.Status200OK;
                }
                else if(result.ToString() == "RequiresPasswordChange")
                {
                    //var user = await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false);
                    //var res = await user.StartWithSrpAuthAsync(new InitiateSrpAuthRequest { Password=model.Password});
                    //Console.WriteLine(res);
                    //var authRequest = new AdminInitiateAuthRequest
                    //{
                    //    UserPoolId = _configuration.GetValue<string>("AWS:UserPoolId"),
                    //    ClientId = _configuration.GetValue<string>("AWS:UserPoolClientId"),
                    //};
                    response.Code = StatusCodes.Status200OK;
                    response.URL = "/forcepasswordchange";
                }
                else
                {
                    response.Code = StatusCodes.Status400BadRequest;
                    var user = await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false);
                    if(user == null)
                    {
                        response.Message = Accounts.USER_NOT_EXIST;
                    }
                    else
                    {
                        response.Message = Accounts.INVALID_CREDENTIALS;
                    }
                }
            }
            return response;
        }

        [HttpPost("forcepasswordchange")]
        public async Task<ChangePasswordResponse> ForcePasswordChange(ChangePassword model)
        {
            ChangePasswordResponse response = new ChangePasswordResponse();
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false);
                if (user == null)
                {
                    response.Code = StatusCodes.Status400BadRequest;
                    response.Message = Accounts.USER_NOT_EXIST;
                }
                else
                {
                    var authResponse = await user.StartWithSrpAuthAsync(new InitiateSrpAuthRequest
                                                                        {
                                                                            Password = model.Password,
                                                                        });
                    if(authResponse != null && authResponse.ChallengeName == ChallengeNameType.NEW_PASSWORD_REQUIRED)
                    {
                        authResponse = await user.RespondToNewPasswordRequiredAsync(new RespondToNewPasswordRequiredRequest { 
                                                                                    NewPassword = model.NewPassword, 
                                                                                    SessionID = authResponse.SessionID });
                        if(authResponse != null && authResponse.AuthenticationResult.AccessToken != null)
                        {
                            response.Code = StatusCodes.Status200OK;
                        }
                        else
                        {
                            response.Code = StatusCodes.Status400BadRequest;
                            response.Message = Accounts.UNKNOWN_ERROR;
                        }
                    }
                    else
                    {
                        response.Code = StatusCodes.Status400BadRequest;
                        response.Message = Accounts.UNKNOWN_ERROR;
                    }
                }
            }
            return response;
        }

        [HttpPost("forgotpassword")]
        public async Task<ForgotPasswordResponse> ForgotPassword(ForgotPassword model)
        {
            ForgotPasswordResponse response = new ForgotPasswordResponse();
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false);
                if (user == null)
                {
                    response.Code = StatusCodes.Status400BadRequest;
                    response.Message = Accounts.USER_NOT_EXIST;
                }
                else
                {
                    user.ForgotPasswordAsync().Wait();
                    response.Code = StatusCodes.Status200OK;
                }

            }
            return response;
        }

        [HttpPost("confirmnewpassword")]
        public async Task<ConfirmNewPasswordResponse> ConfirmNewPassword(ConfirmNewPassword model)
        {
            ConfirmNewPasswordResponse response = new ConfirmNewPasswordResponse();
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false);
                    if (user == null)
                    {
                        response.Code = StatusCodes.Status400BadRequest;
                        response.Message = Accounts.USER_NOT_EXIST;
                    }
                    else
                    {
                        await user.ConfirmForgotPasswordAsync(model.ConfirmationCode, model.NewPassword);
                        response.Code = StatusCodes.Status200OK;
                    }
                }
            }
            catch(Exception ex)
            {
                response.Code = StatusCodes.Status400BadRequest;
                response.Message = Accounts.PASSWORD_UPDATE_FAILED;
            }
            return response;
        }

        [HttpPost("signout")]
        public async Task<SignoutResponse> Signout()
        {
            SignoutResponse response = new SignoutResponse();
            try
            {
                if (User.Identity.IsAuthenticated)
                    await _signInManager.SignOutAsync().ConfigureAwait(false);
                response.Code = StatusCodes.Status200OK;
            }
            catch(Exception ex)
            {
                response.Code = StatusCodes.Status500InternalServerError;
                response.Message = Accounts.UNKNOWN_ERROR;
            }
            return response;
        }
    }
}

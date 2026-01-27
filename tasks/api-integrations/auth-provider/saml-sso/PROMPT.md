# Task: Enterprise SAML SSO

## Objective
Implement SAML 2.0 Single Sign-On with Spring Security SAML.

## Requirements

1. **SP Configuration**
   - Service Provider metadata
   - Entity ID configuration
   - Assertion Consumer Service
   - Single Logout Service

2. **IdP Integration**
   - Metadata import from IdP
   - Certificate validation
   - Attribute mapping
   - Multiple IdP support

3. **Authentication**
   - SP-initiated SSO
   - IdP-initiated SSO
   - Just-in-time provisioning
   - Role mapping from assertions

4. **Single Logout**
   - SP-initiated logout
   - IdP-initiated logout
   - Session invalidation

## Files to Create
- `src/main/java/config/SamlConfig.java` - SAML config
- `src/main/java/saml/SamlUserService.java` - User service
- `src/main/java/saml/AttributeMapper.java` - Attribute mapping
- `src/main/java/controllers/SamlController.java` - SAML endpoints

## Success Criteria
- [ ] SP metadata generated
- [ ] IdP metadata imported
- [ ] SSO login works
- [ ] Attributes mapped correctly
- [ ] Single logout works

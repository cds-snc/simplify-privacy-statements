For any questions about this research, please contact:
{researcher_name}
{researcher_phone}
{researcher_email}

{var}

We work with the Canadian Digital Service (CDS), a program in the Treasury Board Secretariat (TBS). We are working with the {partner_department} to improve their services.

{session_goal}[We are conducting research to help us evaluate the ease of use and content of a website.] {product_goal} [This will help us create an online tool that will make it easier for Veterans to determine which VAC services are relevant to them.]

{session_activity}[To do this, we will ask you to complete specific tasks with this prototype and ask you to describe your thoughts and impressions.] {session_duration}[This will take us approximately 1 hour.]

By participating in this study, you understand that:

* You are volunteering to participate, and may stop at any time for any reason;

{confidentiality == "anonymized" ?
<p>Your responses will be {confidentiality}, which means they will not be linked back to you. Due to this, you will not be able to withdraw or correct your responses once provided;</p> : null }

{confidentiality == "confidential" : }
@switch($confidentiality)
 @case(“anonymous”)
 @case(“anonymized”)
   *
   @break
 @case(“confidential”)
   * Your responses will be {{ $confidentiality }} [confidential], which means they will not be linked back to you.
   @break
 {{-- TODO: deal with “not-confidential” and “public” --}}
@endswitch

* Your participation and answers will not affect your access to Government of Canada services or benefits; and,



* If you have any further questions, you may contact the above researcher or cds-snc@tbs-sct.gc.ca at any time.

☐ 	**I understand the points above and consent to participate in the research.**

<Grid container>
<Grid item xs={6}>
  <DateForm />
</Grid>
<Grid item xs={6}>
  <TimeForm />
</Grid>

Participation is completely voluntary.

By participating in this research you understand that {personal_information} will be collected.

{screening_questionnaire === true ?
<p>Information in the screening questionnaire is being collected to ensure our research cohorts are diverse and to identify feedback trends for different groups.</p>
: null}

The Canadian Digital Service (CDS) will use information from the testing session to improve the ease of use of products that provide access to Government of Canada services. {disclosure_explanation}

{[‘Outside of the Government of Canada’, ‘Government institutions’, ‘Specific department(s)’].indexOf(disclosure_audience) > -1 ?
<p>
 CDS may publish or share {disclosure_format} with {disclosure_audience} for {disclosure_purpose}.
 </p>
 : null
}

{[‘anonymous’, ‘anonymized’, ‘confidential’].indexOf(confidentiality) > -1 ?
<p>Your name will not be associated with your responses.</p>
:
null
}

{nature_of_recording !== ‘no recording’ ?
<p>If you consent to being recorded, the recording may be disclosed to other departments for training and learning purposes.</p>
: null}

{administrative_purpose === false ?
<p> Your personal information will not be used for any “administrative purposes”. This means that your information will not be used for any decision making process that directly affects you or your access to Government of Canada services.</p>
: null}

{possibility_of_withdrawal}

{[‘anonymous’, ‘anonymized’].indexOf(confidentiality) > -1 ?
<p>Due to the anonymization of responses, CDS will have no reliable means of associating you with your responses, which means we may not be able to access the information you have provided to respond to your request for correction to inaccurate information or withdrawal.</p>
: null}
   {{-- TODO: add withdrawal procedure --}}

{[‘Outside of the Government of Canada’, ‘Government institutions’, ‘Specific department(s)’].indexOf(disclosure_audience) ?
  <p>If you decide to withdraw your consent CDS will not share your {disclosure_format} further. However, prior to your withdrawal, CDS may have already shared your recording with {disclosure_audience}, which may continue to use {disclosure_format} for {disclosure_purpose}.</p>
}

CDS is a program within the Treasury Board of Canada Secretariat (TBS). The collection and use of your personal information by TBS is authorized by the _Financial Administration Act_. The collection, use, and disclosure of your personal information is in accordance with the federal _Privacy Act_.

Any personal information that may be collected is described in the Standard Personal Information Bank entitled Outreach Activities, PSU 938, which can be found in the TBS webpage Information about programs and information holdings

Any comments or concerns you may have regarding this Statement, your privacy rights, or the Privacy Act may be directed to the TBS Access to Information and Privacy Coordinator by email at ATIP.AIPRP@tbs-sct.gc.ca or by telephone at 1-866-312-1511.

You may also wish to contact the Office of the Privacy Commissioner of Canada by email at info@priv.gc.ca or by telephone at 1-800-282-1376. You have the right to complain to the Office of the Privacy Commissioner of Canada about the handling of your personal information by TBS.


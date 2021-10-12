[%
email_footer = site_name;
-%]
[% FILTER collapse %][% PROCESS '_email_settings.html' %][% END ~%]
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" />
    <xsl:variable name="title" select="/rss/channel/title"/>
    <xsl:variable name="uri" select="/rss/channel/uri"/>
    <xsl:template match="/">
        [% PROCESS '_email_top.html' for_rss=1 rss_title='<xsl:value-of select="$title"/> XML Feed' %]

<!--  START UPPER BODY -->
	 					<table width="100%" style="border-spacing: 0; background-color: #ffffff;">
              <tr>
                <td class="padding">
                  <p class="para" style="text-align: left; font-weight: 400;font-size: 14px;color: #675F58; line-height: 22px; padding: 0px; margin: 0px;">
                    Ovo je RSS kanal za [% site_name %]. RSS izvori vam omogućuju da pratite posljednje novosti na internetskoj stranici.
                    <a href="https://hr.wikipedia.org/wiki/RSS">Saznajte više o RSS-u.</a>
                  </p>
                  <p class="para" style="text-align: left; font-weight: 400;font-size: 14px;color: #675F58; line-height: 22px; padding: 0px; margin: 0px;">
                    Da biste se pretplatili na RSS kanal, kopirajte ovaj link u vaš RSS čitač:
                    <input type="text" class="form-control" onClick="this.setSelectionRange(0, this.value.length)">
                      <xsl:attribute name="value">
                          <xsl:value-of select="$uri"/>
                      </xsl:attribute>
                    </input>
                  </p>
                </td>
              </tr>
						</table>
<!--  UPPER BODY END  -->

<!--  START LINE  -->
						<table width="100%" style="border-spacing: 0; background-color: #ffffff;padding: 10px 15px;">
							<tr>
								<td style="border-bottom: 2px solid #DAD6D3;">
								</td>
							</tr>
						</table>
<!-- END LINE  -->

<!--  START RSS CONTENT -->
	 					<table width="100%" style="border-spacing: 0; background-color: #ffffff;">
											<tr>
												<td class="padding" style="text-align: left;">
													<p class="sub-header" style=" font-weight: 600;font-size: [% header_text_size %]; color: #1D1C1C; padding: 0px; margin: 0px;">
                            <xsl:value-of select="$title"/>
												  </p>
												  <xsl:apply-templates select="rss/channel/item"/>
										    </td>
								      </tr>
						</table>
<!--  RSS CONTENT END  -->

        [% PROCESS '_email_bottom.html' %]

    </xsl:template>

    <xsl:template match="item">
        <div style="[% list_item_style %]">
            <h2 style="[% list_item_h2_style %]"><a href="{link}"><xsl:value-of select="title"/></a></h2>
            <xsl:value-of disable-output-escaping="yes" select="description" />
        </div>
    </xsl:template>

</xsl:stylesheet>

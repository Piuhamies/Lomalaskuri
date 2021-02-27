<?xml version='1.0'?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XS
L/Transform ">
<xsl:template match="/"> 
<html><body> 
<table border="2" bgcolor="yellow"> 
<tr> 
<th>lastmod</th> 
<th>changefreq</th> 
</tr> 
<xsl:for-each select=""sm:sitemap"> 
<div class="th">
URL
<xsl:if test="sm:url/sm:lastmod"> / Last Modified</xsl:if>
<xsl:if test="sm:url/sm:changefreq"> / Change Frequency</xsl:if>
<xsl:if test="sm:url/sm:priority"> / Priority</xsl:if>
</div>
</xsl:for-each> 
</table> 
</body> </html> 
</xsl:template> 
</xsl:stylesheet>
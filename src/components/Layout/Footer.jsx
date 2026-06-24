export default function Footer() {
	return (
		<footer className="footer" id="footer">
			<div className="footer-inner">
				<div className="inner-left">yourWebsite</div>
				<div className="inner-right">
					<ul className="footer-menu">
						<li>
							<a href="#about">소개</a>
							<ul className="sub-menu">
								<li>
									<a href="#">회사소개</a>
								</li>
								<li>
									<a href="#">연혁</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#service">서비스</a>
							<ul className="sub-menu">
								<li>
									<a href="#">구독</a>
								</li>
								<li>
									<a href="#">상품</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#portfolio">포트폴리오</a>
						</li>
						<li>
							<a href="#contact">문의하기</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
